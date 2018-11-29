/* eslint-disable no-mixed-spaces-and-tabs,react/jsx-indent,react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues, submit, SubmissionError } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { Button, ProgressLine } from 'elements';
import { FormNames, AvailableZipCodes, CERTS_VACCS_MAP_VALUES } from 'enums';
import Header from 'pages/layout/Header';
import Footer from 'pages/layout/Footer';
import { showToast, localStorageHelper as ls } from 'utils';
import UserMainInfoForm from './UserInfoForm';
import UserRequiredInfoForm from './RequiredInfoForm';
import UserCompanyInfoForm from './CompanyInfo';
import ProfileCribSheetForm from './CribSheet';
import EmrSysytemsForm from './EmrSystems';
import BankAccountInfoForm from './BankAccountInfoForm';
import {
	setFormValues,
	checkFacility,
	setActiveStep,
	resetAllFormsAction,
	checkPhoneExistRequest,
	createUser,
	saveBankAccauntInfo,
	createOrganization,
	createDefaultCribSheet,
	updateDefaultCribSheet,
	createDefaultRequirements,
	updateDefaultRequirements,
} from '../actions';
import { getAllUserData } from '../selectors';

const mapKeys = obj => {
	let elements = [];
	Object.keys(obj).forEach(key => {
		if (obj[key]) {
			elements.push(CERTS_VACCS_MAP_VALUES[key]);
		}
	});
	return elements;
};

const mapStateToProps = (state) => ({
	companyInfo: getFormValues(FormNames.company)(state) || {},
	formSteps: state.onboardingInfo.formSteps,
	activeStep: state.onboardingInfo.formActiveStep,
	allUserData: getAllUserData(state),
	selectedBank: state.onboardingInfo.bankAccount,
	locationId: state.currentUser.locationInfo.location ? state.currentUser.locationInfo.location.location_id : null,
});

const mapDispatchToProps = (dispatch) => ({
	createUser: data => createUser(dispatch, data),
	createOrganization: data => createOrganization(dispatch, data),
	createCribSheet: data => createDefaultCribSheet(dispatch, data),
	updateCribSheet: data => updateDefaultCribSheet(dispatch, data),
	createRequirements: data => createDefaultRequirements(dispatch, data),
	updateRequirements: data => updateDefaultRequirements(dispatch, data),
	saveBankInfo: data => saveBankAccauntInfo(dispatch, data),
	setFormValues: (formName, values) => setFormValues(dispatch, formName, values),
	submitForm: (formName) => dispatch(submit(formName)),
	checkFacilityExist: (npi_number = null) => checkFacility(dispatch, { npi_number }),
	checkPhoneExist: (phone) => checkPhoneExistRequest(dispatch, phone),
	setStep: (step) => setActiveStep(dispatch, step),
	resetForms: () => resetAllFormsAction(dispatch),
	showError: (message) => showToast(dispatch, message),
});

class ProfileInfoSteps extends React.Component {
	static propTypes = {
		createUser: PropTypes.func,
		createOrganization: PropTypes.func,
		createCribSheet: PropTypes.func,
		updateCribSheet: PropTypes.func,
		saveBankInfo: PropTypes.func,
		setFormValues: PropTypes.func,
		createRequirements: PropTypes.func,
		updateRequirements: PropTypes.func,
		showError: PropTypes.func,
		submitForm: PropTypes.func,
		checkFacilityExist: PropTypes.func,
		checkPhoneExist: PropTypes.func,
		history: PropTypes.shape(),
		companyInfo: PropTypes.shape(),
		allUserData: PropTypes.shape(),
		locationId: PropTypes.string,
		setStep: PropTypes.func,
		resetForms: PropTypes.func,
		activeStep: PropTypes.number,
		formSteps: PropTypes.arrayOf(PropTypes.string),
	};
	
	static isInRightArea(postalCode) {
		return AvailableZipCodes.includes(postalCode);
	}
	
	static skipToServiceLater(state, postalCode) {
		if (state !== "TX") {
			return true;
		}
		
		return !ProfileInfoSteps.isInRightArea(postalCode);
	}
	
	constructor(props) {
		super(props);
		this.onSaveData = this.onSaveData.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}
	
	componentDidMount() {
		if (!ls.get('_a')) {
			return this.props.history.push('/agreements');
		}
		
		onbeforeunload = () => {
			this.clarifyStorage();
			return 'Do not save'
		};
		history.pushState(null, null, location.href);
		window.addEventListener('popstate', this.onChangeHistory);
	}
	
	componentWillUnmount() {
		this.clarifyStorage();
		onbeforeunload = null;
		window.removeEventListener('popstate', this.onChangeHistory);
		this.props.resetForms();
	}
	
	get availableStepsMap() {
		let mappedSteps = {};
		
		this.props.formSteps.forEach((stepName, index) => {
			mappedSteps[index] = stepName;
		});
		
		return mappedSteps;
	}
	
	get stepsCount() {
		return Object.keys(this.availableStepsMap).length;
	}
	
	get currentForm() {
		const name = this.availableStepsMap[this.props.activeStep];
		
		return {
			name,
			step: this.props.activeStep,
			verified: !!ls.get(name),
		};
	}
	
	onChangeHistory = () => history.pushState(null, null, location.href);
	
	isLastStep = () => this.props.activeStep === this.stepsCount - 1;
	
	validate = values => {
		const currentStepName = this.availableStepsMap[this.props.activeStep];
		const isEmrSystem = currentStepName === FormNames.emrSystems;
		
		if (_isEmpty(values) && isEmrSystem) {
			throw new SubmissionError({
				_error: 'Please, select EMR system',
			});
		}
	};
	
	handleAccountRequest = async (values, successCallback, verify) => {
		return this.props.checkPhoneExist(values.phone)
			.then(() => this.props.showError('Phone already exist'))
			.catch(() => this.props.createUser(values)
				.then(() => {
					verify();
					successCallback();
				}),
			);
	};
	
	handleCompanyRequest = async (values, successCallback, verify) => {
		const {
			companyInfo: {
				npi_number,
				address: {
					administrative_area_level_1: state,
					postal_code,
				} = {},
			},
			showError,
			createOrganization,
		} = this.props;
		
		if (this.currentForm.verified) {
			showError('Company is already created for this account! You can change details in your profile settings later.');
			return successCallback();
		}
		
		return await this.props.checkFacilityExist(npi_number)
			.then(() => this.props.history.push('/permission'))
			.catch(async res => {
				if (res.code === 'crud.read_records_not_found') {
					return await createOrganization(values)
						.then(() => {
							verify();
							successCallback();
						});
				}
				
				if (ProfileInfoSteps.skipToServiceLater(state, postal_code)) {
					return this.props.history.push('/later');
				}
			});
	};
	
	handleRequirementsRequest = (values) => {
		const {
			createRequirements,
			locationId,
			allUserData: { required: { certs, vacc } },
			updateRequirements,
		} = this.props;
		
		const data = {
			location_id: locationId || ls.get('_loc_id'),
			requirements: {
				emr_systems: [values['emr-systems']],
				certifications: mapKeys(certs),
				vaccinations: mapKeys(vacc),
			},
		};
		
		return this.currentForm.verified
			? updateRequirements(data)
			: createRequirements(data);
	};
	
	handleCribSheetRequest = (crib_sheet) => {
		const {
			createCribSheet,
			updateCribSheet,
			locationId,
		} = this.props;
		
		const data = {
			location_id: locationId || ls.get('_loc_id'),
			crib_sheet,
		};
		
		return this.currentForm.verified
			? updateCribSheet(data)
			: createCribSheet(data);
	};
	
	handleBankAccountRequest = async data => {
		return await this.props.saveBankInfo(data)
	};
	
	handleSubmitForm = async (values) => {
		const {
			activeStep,
		} = this.props;
		
		
		const successCallback = () => {
			this.props.setFormValues(this.currentForm.name, values);
			this.props.setStep(activeStep + 1);
			ls.set('_step', activeStep + 1);
		};
		
		const verifyStep = () => ls.set(this.currentForm.name, 'verified');
		
		this.validate(values);
		
		switch (activeStep) {
			case 0:
				return this.handleAccountRequest(values, successCallback, verifyStep);
			
			case 1:
				return this.handleCompanyRequest(values, successCallback, verifyStep);
			
			case 3:
				await this.handleRequirementsRequest(values);
				verifyStep();
				break;
			
			case 4:
				await this.handleCribSheetRequest(values);
				verifyStep();
				break;
		}
		
		successCallback();
	};
	
	onSaveData = () => {
		const { showError, allUserData } = this.props;
		
		return this.handleBankAccountRequest(allUserData.bank)
			.then(() => {
				this.props.history.push('/app/create-shift')
				ls.remove('_p');
				ls.remove('_e');
				ls.remove('_a');
			})
			.catch(err => showError(err.message));
	};
	
	clarifyStorage() {
		ls.remove('_loc_id');
		ls.remove('_step');
		this.props.formSteps.forEach(name => ls.remove(name));
	}
	
	validateForm() {
		this.props.submitForm(this.availableStepsMap[this.props.activeStep]);
	}
	
	renderActions() {
		const { activeStep } = this.props;
		const activeStepName = this.availableStepsMap[activeStep];
		const isLastStep = this.isLastStep();
		
		const BACK_BUTTON = (
			<span className="mr-10" key="back">
				<Button
					status="empty"
					onClick={() => this.props.setStep(activeStep - 1)}
					iconLeft="icon-arrow-left"
				>Back</Button>
      </span>
		);
		
		const NEXT_BUTTON = (
			<Button
				key="next"
				label="Next"
				onClick={this.validateForm}
				iconRight="icon-arrow-right"
			/>
		);
		
		return [
			activeStepName !== FormNames.main && BACK_BUTTON,
			!isLastStep && NEXT_BUTTON,
		];
	}
	
	renderStep(step) {
		switch (this.availableStepsMap[step]) {
			case FormNames.main:
				return <UserMainInfoForm onSubmit={this.handleSubmitForm} />;
			
			case FormNames.company:
				return <UserCompanyInfoForm onSubmit={this.handleSubmitForm} />;
			case FormNames.required:
				return <UserRequiredInfoForm onSubmit={this.handleSubmitForm} />;
			case FormNames.emrSystems:
				return <EmrSysytemsForm onSubmit={this.handleSubmitForm} />;
			case FormNames.crib:
				return <ProfileCribSheetForm onSubmit={this.handleSubmitForm} />;
			case FormNames.bankAccount:
				return <BankAccountInfoForm onFinish={this.onSaveData} />;
			default:
				return null;
		}
	}
	
	render() {
		const { activeStep, formSteps } = this.props;
		
		return (
			<div>
				<div className="page-content">
					<Header />
					<div className="show-for-desktop">
						<ProgressLine steps={formSteps.length} progress={activeStep + 1} />
					</div>
					<div className="pt-40">
						{this.renderStep(activeStep)}
					</div>
				</div>
				<Footer>
					<div className="center-block small pt-15 pl-15 pr-15 flex-end flex">
						{this.renderActions()}
					</div>
				</Footer>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoSteps);

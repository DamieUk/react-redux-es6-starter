import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CribSheetForm from 'pages/common/CribSheetForm';
import {
	reduxForm,
	getFormValues,
} from 'redux-form';
import { ProgressDots } from 'elements';
import { FormNames } from 'enums';

const mapStateToProps = (state) => ({
	formValues: getFormValues(FormNames.crib)(state) || {},
	initialValues: state.onboardingInfo[FormNames.crib],
	formSteps: state.onboardingInfo.formSteps,
	activeStep: state.onboardingInfo.formActiveStep,
});

const ProfileCribSheet = ({ handleSubmit, formSteps, activeStep, initialValues }) => {
	return (
		<div className="center-block small pl-15 pr-15  pb-30 fade-in" onSubmit={handleSubmit}>
			<h2 className="show-for-mobile text-center mb-0">Enter Profile</h2>
			<div className="mb-30 show-for-mobile">
				<ProgressDots total={formSteps.length} active={activeStep + 1} />
			</div>
			<h2 className="mb-30 show-for-desktop">Crib Sheet</h2>
			<CribSheetForm
				handleSubmit={handleSubmit}
				initialValues={initialValues}
			/>
		</div>
	);
};

ProfileCribSheet.propTypes = {
	handleSubmit: PropTypes.func,
	initialValues: PropTypes.shape(),
	activeStep: PropTypes.number,
	formSteps: PropTypes.arrayOf(PropTypes.string),
};

const ProfileCribSheetForm = reduxForm({ form: FormNames.crib })(ProfileCribSheet);

export default connect(mapStateToProps)(ProfileCribSheetForm);

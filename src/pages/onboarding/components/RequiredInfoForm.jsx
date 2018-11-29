import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CertsAndVaccinaForm from 'pages/common/CertsAndVaccinaForm';
import { reduxForm } from 'redux-form';
import { ProgressDots } from 'elements';
import { FormNames } from 'enums';

const mapStateToProps = (state) => ({
	mainInfo: state.onboardingInfo[FormNames.main] || {},
	initialValues: state.onboardingInfo[FormNames.required],
	formSteps: state.onboardingInfo.formSteps,
	activeStep: state.onboardingInfo.formActiveStep,
});

const UserRequiredInfo = (props) => {
	const {
		mainInfo: { firstName },
		handleSubmit,
		formSteps,
		activeStep,
		initialValues,
	} = props;
	return (
		<div className="fade-in">
			<h2 className="show-for-mobile text-center mb-0">Enter Profile</h2>
			
			<div className="mb-30 show-for-mobile">
				<ProgressDots total={formSteps.length} active={activeStep + 1} />
			</div>
			
			<h2 className="mb-30 text-center show-for-desktop">
				Welcome, {' '} {firstName}! What do you require?
			</h2>
			
			<div className="center-block small pl-15 pr-15">
				<CertsAndVaccinaForm initialValues={initialValues} handleSubmit={handleSubmit} />
			</div>
		</div>
	);
};

UserRequiredInfo.propTypes = {
	mainInfo: PropTypes.shape(),
	handleSubmit: PropTypes.func,
	activeStep: PropTypes.number,
	initialValues: PropTypes.shape(),
	formSteps: PropTypes.arrayOf(PropTypes.string),
};

export const UserRequiredInfoForm = reduxForm({ form: FormNames.required })(UserRequiredInfo);

export default connect(mapStateToProps)(UserRequiredInfoForm);

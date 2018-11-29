import React from 'react';
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { FormCheckbox } from "elements";

const CertsVaccinaForm = ({ handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<div className="mb-20 pb-10 bb">
			<h4>Standard Certifications Required</h4>
			<Field
				name="certs.basic"
				labelClassName="size-16"
				label="Basic Life Support (BLS)"
				component={FormCheckbox}
			/>
			<Field
				name="certs.advanced"
				labelClassName="size-16"
				label="Advanced Cardiovascular Life Support (ACLS)"
				component={FormCheckbox}
			/>
		</div>
		<div className="mb-20 pb-40">
			<h4>Vaccinations Required</h4>
			<Field
				name="vacc.hepatit"
				labelClassName="size-16"
				label="Hepatitis B"
				component={FormCheckbox}
			/>
			<Field
				name="vacc.tdap"
				labelClassName="size-16"
				label="TDAP"
				component={FormCheckbox}
			/>
			<Field
				name="vacc.flu"
				labelClassName="size-16"
				label="Flu"
				component={FormCheckbox}
			/>
		</div>
		
		
		<button type="submit" hidden />
	</form>
);

CertsVaccinaForm.propTypes = {
	handleSubmit: PropTypes.func,
	// eslint-disable-next-line react/no-unused-prop-types
	initialValues: PropTypes.shape(),
};

export default CertsVaccinaForm;
import React from 'react';
import { FormInput } from "elements";
import { Field } from "redux-form";
import PropTypes from "prop-types";

const  CribSheetForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="contact_person"
				label="Point of Contact"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="contact_person_detail"
				label="POC phone number"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="other_contact"
				label="Backup Point of Contact"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="other_contact_detail"
				label="Backup POC phone number"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="report_to"
				label="Report to"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="get_badge_from"
				label="Obtain Badge directions"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="entrance"
				label="Entrance Directions"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="parking"
				label="Parking Directions"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="break_policy"
				label="Break Policy"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="lunch_policy"
				label="Lunch policy"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="clock_on_ready"
				label="Clock On"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="on_unit_time"
				label="Unit Time"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="property_storage"
				label="Property Storage"
				className="mb-20"
				component={FormInput}
			/>
			<Field
				name="other"
				label="Other Notes"
				className="mb-20"
				component={FormInput}
			/>
			<button type="submit" hidden />
		</form>
	);
};

CribSheetForm.propTypes = {
	handleSubmit: PropTypes.func,
	// eslint-disable-next-line react/no-unused-prop-types
	initialValues: PropTypes.shape(),
};

export default CribSheetForm;
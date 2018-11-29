import { FormNames } from 'enums';
import { localStorageHelper as ls } from 'utils';
import types from './actionTypes';

const MainInfoInitial = {
	firstName: '',
	lastName: '',
	middleName: '',
	image: null,
	phone: '',
	title: '',
	dob: '',
	gender: '',
};

const OrgAndCompanyInitial = {
	company: '',
	npi_number: null,
	address: {
		street_number: null,
		route: '',
		unit_number: '',
		locality: '',
		administrative_area_level_1: '',
		country: '',
		postal_code: '',
		longitude: '',
		latitude: '',
	},
};

const CribSheetInitial = {
	contact_person: '',
	contact_person_detail: '',
	other_contact: '',
	other_contact_detail: '',
	report_to: '',
	get_badge_from: '',
	entrance: '',
	parking: '',
	break_policy: '',
	lunch_policy: '',
	clock_on_ready: '',
	on_unit_time: '',
	property_storage: '',
	other: '',
};

const initialState = {
	accountId: ls.get('_i') || null,
	account: {
		id: ls.get('_i') || null,
	},
	[FormNames.main]: MainInfoInitial,
	[FormNames.company]: OrgAndCompanyInitial,
	[FormNames.emrSystems]: {},
	[FormNames.required]: {
		certs: {},
		vacc: {},
	},
	[FormNames.crib]: CribSheetInitial,
	bankAccount: {},
	certifications: [],
	systems: ["EPIC", "eClinicalWorks", "SAP", "Cerner", "MedHost", "Meditech", "HMS"],
	vaccinations: [],
	formSteps: [
		FormNames.main,
		FormNames.company,
		FormNames.required,
		FormNames.emrSystems,
		FormNames.crib,
		FormNames.bankAccount,
	],
	formActiveStep: +ls.get('_step') || 0,
};

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case types.setFormValues:
			return {
				...state,
				[payload.form]: payload.values,
			};
		
		case types.selectBank:
			return {
				...state,
				bankAccount: payload,
			};
		
		case types.setActiveStep:
			return {
				...state,
				formActiveStep: payload,
			};
		
		case types.reset:
			return {
				...state,
				[FormNames.main]: MainInfoInitial,
				[FormNames.company]: OrgAndCompanyInitial,
				[FormNames.emrSystems]: {},
				[FormNames.required]: {
					certs: {},
					vacc: {},
				},
				[FormNames.crib]: CribSheetInitial,
				bankAccount: {},
				formActiveStep: 0,
			};
		
		default:
			return state;
	}
};
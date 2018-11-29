import { FormNames } from 'enums';
import { reformatPhone } from './helpers';

export const getAllUserData = state => ({
	userInfo: state.onboardingInfo[FormNames.main],
	company: state.onboardingInfo[FormNames.company],
	required: state.onboardingInfo[FormNames.required],
	emrSystems: state.onboardingInfo[FormNames.emrSystems],
	crib: state.onboardingInfo[FormNames.crib],
	bank: state.onboardingInfo.bankAccount,
});

export const reformatUserData = data => ({
	account: {
		phone: reformatPhone(data.phone),
		email: {
			email_address: localStorage.getItem('_e'),
		},
		password: localStorage.getItem('_p'),
	},
	profile: {
		person: {
			first_name: data.firstName,
			last_name: data.lastName,
			middle_name: data.middleName,
			title: data.title,
			gender: data.gender,
			date_of_birth: data.dob.format('YYYY-MM-DD'),
		},
	},
});

export const reformatCompanyInfo = data => ({
	"organization": {
		"organization_name": data.company,
	},
	"location": {
		"location_name": data.location,
	},
	"address": {
		...data.address,
		"geodata": {
			"results": [data.geodata],
			"status": "OK",
		},
	},
	phone: reformatPhone(data.phone),
	"npi": {
		"npi_number": data.npi_number,
	},
});
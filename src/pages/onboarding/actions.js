import { createOrgWithLocationAction } from 'pages/profile/actions';
import {
	Services,
	showToast,
	createAction,
	startFetching,
	finishFetching,
	localStorageHelper as ls,
} from 'utils';
import { errorCodes, DOC_TYPES } from 'enums';
import types from './actionTypes';
import { reformatPhone } from './helpers';
import { reformatUserData, reformatCompanyInfo } from './selectors';

const selectBankAction = (bank) => createAction(types.selectBank, bank);

export const setFormValues = (dispatch, form, values) => dispatch(
	createAction(types.setFormValues, { form, values }),
);

export const setActiveStep = (dispatch, step) => dispatch(
	createAction(types.setActiveStep, step),
);

export const resetAllFormsAction = (dispatch) => dispatch(
	createAction(types.reset),
);

export const checkPhoneExistRequest = (dispatch, phone) => {
	const phoneParams = reformatPhone(phone);
	return Services.portvakt
		.get('/contact_info/phone_number/exists', phoneParams);
};

export const checkFacility = (dispatch, params) => Services.zapisac
	.get('/demand/npi_number/exists', params, dispatch);

export const createAccount = (dispatch, data) => Services.portvakt
	.post('/account/demand', { data: reformatUserData(data).account })
	.then(res => {
		localStorage.setItem('_t', res.data.credentials.jwt);
		localStorage.setItem('_i', res.data.account_id);
		return res.data;
	});

export const createProfile = (dispatch, data) => Services.zapisac
	.post('/demand/person/profile', { data: reformatUserData(data).profile })
	.then(res => res.data.person);

export const submitAgreements = () => Services.aftale
	.post('/agreement', { data: {
		documents: DOC_TYPES.map(document_type => ({ document_type })),
		}
	});

export const updateProfile = (dispatch, data) => Services.zapisac
	.patch('/demand/person/profile', { data: reformatUserData(data).profile })
	.then(res => res.data.person);

export const createUser = async (dispatch, data) => {
	startFetching(dispatch, 'globalLoading');
	
	try {
		await createAccount(dispatch, data);
		await createProfile(dispatch, data);
		await submitAgreements();
	} catch (e) {
		
		if (e.code === errorCodes.uniqInstance) {
			await updateProfile(dispatch, data);
			return finishFetching(dispatch);
		}
		
		showToast(dispatch, e.message || 'Somethings went wrong');
	}
	
	finishFetching(dispatch);
};

export const createOrganization = (dispatch, data) => Services.zapisac
	.post('/demand/organization/profile/create_with_location', {
		data: {
			account_id: localStorage.getItem('_i'),
			...reformatCompanyInfo(data),
		},
	}, dispatch)
	.then(res => {
		ls.set('_loc_id', res.data.location_profile.location.location_id);
		createOrgWithLocationAction(dispatch, res.data);
		return res.data;
	})
	.catch(err => showToast(dispatch, err.message));

export const createDefaultRequirements = (dispatch, data) =>
	Services.zapisac.post('/demand/location/requirements', { data }, dispatch)
		.catch(err => showToast(dispatch, err.message));

export const updateDefaultRequirements = (dispatch, data) =>
	Services.zapisac.patch('/demand/location/requirements', { data }, dispatch)
		.catch(err => showToast(dispatch, err.message));

export const createDefaultCribSheet = (dispatch, data) => Services.zapisac
	.post('/demand/location/crib_sheet', { data }, dispatch)
	.catch(err => showToast(dispatch, err.message));

export const updateDefaultCribSheet = (dispatch, data) => Services.zapisac
	.patch('/demand/location/crib_sheet', { data }, dispatch)
	.catch(err => showToast(dispatch, err.message));

export const saveBankAccauntInfo = (dispatch, data) => Services.banka
	.post('/credentials/plaid/public_token_exchange', { data }, dispatch);

export const selectBank = (dispatch, bank = {}) => dispatch(selectBankAction(bank));
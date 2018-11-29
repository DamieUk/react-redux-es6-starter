import { createAction, actionTypesCreator } from './actionCreator';

const defaultAction = {
	type: 'test-type',
	payload: null,
};

const defaultActionTypes = {
	fetchData: 'home/get',
	fetchDataSuccess: 'home/get/success',
};

describe('Check app utils', () => {
	
	it('should actionTypesCreatorMap create action types correctly', function() {
		const types = actionTypesCreator('home', {
			fetchData: 'get',
			fetchDataSuccess: ['get', 'success'],
		});
		
		expect(types).toEqual(defaultActionTypes);
	});
	
	it('should createAction create action correctly', function() {
		let action = createAction('test-type');
		
		expect(action).toEqual(defaultAction);
		
		action = createAction('test-type', 'mock-payload');
		
		expect(action).toEqual({ ...defaultAction, payload: 'mock-payload' });
	});
	
});
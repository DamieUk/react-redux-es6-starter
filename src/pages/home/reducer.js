import types from './actionTypes';

const initialState = {
	elements: []
};

export default (state = initialState, { payload, type }) => {
	switch (type) {
		case types.test:
			return {
				...state,
				elements: payload,
			};
		
		default:
			return state;
	}
};
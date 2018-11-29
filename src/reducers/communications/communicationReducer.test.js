import reducer, { types, initialState } from './index';

describe('todos reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, initialState)).toEqual(initialState);
	});
	
	it('should handle loading state', () => {
		expect(
			reducer(initialState, {
				type: types.startLoading,
				payload: 'globalLoading',
			}),
		).toEqual({
			...initialState,
			loadingNamespaces: ['globalLoading'],
		});
		
		expect(
			reducer(initialState, {
				type: types.endLoading,
				payload: 'globalLoading',
			}),
		).toEqual({
			...initialState,
			loadingNamespaces: [],
		});
	});
	
	it('should handle prompt state', () => {
		expect(
			reducer(initialState, {
				type: types.showPrompt,
				payload: { title: 'Mock title' },
			}),
		).toEqual({
			...initialState,
			prompt: { open: true, title: 'Mock title' },
		});
		
		expect(
			reducer(initialState, {
				type: types.hidePrompt,
				payload: {},
			}),
		).toEqual({
			...initialState,
			prompt: { open: false },
		});
		
		expect(
			reducer(initialState, {
				type: types.hidePromptContent,
				payload: {},
			}),
		).toEqual({
			...initialState,
			prompt: null,
		});
	});
	
	it('should handle toasts state', () => {
		const payload = { message: 'mock message', type: 'error', id: '123123', open: true };
		
		expect(
			reducer(initialState, {
				type: types.showToast,
				payload,
			}),
		).toEqual({
			...initialState,
			toasts: [payload],
		});
		
		expect(
			reducer({...initialState, toasts: [payload] }, {
				type: types.hideToast,
				payload: payload.id,
			}),
		).toEqual({
			...initialState,
			toasts: [{...payload, open: false }],
		});
		
		expect(
			reducer({...initialState, toasts: [payload] }, {
				type: types.removeToast,
				payload: payload.id,
			}),
		).toEqual({
			...initialState,
			toasts: [],
		});
	});
});
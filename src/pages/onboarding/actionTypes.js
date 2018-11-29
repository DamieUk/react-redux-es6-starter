import { actionTypesCreatorMap } from 'utils';

const Types = actionTypesCreatorMap('onboarding', {
	setFormValues: ['form', 'set', 'values'],
	selectBank: ['bank', 'select'],
	setActiveStep: ['step', 'set'],
	reset: 'reset',
});

export default Types;

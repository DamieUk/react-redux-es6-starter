import _isArray from 'lodash/isArray';

export const actionTypesCreatorMap = (namespace = '', typesMap = {}) => {
	const typesObj = {};
	Object.keys(typesMap).forEach((type) => {
		const prevValue = typesMap[type];
		const value = _isArray(prevValue) ? prevValue.join('/') : prevValue;
		typesObj[type] = `${namespace}/${value}`;
	});
	return typesObj;
};

export const createAction = (type, payload = null) => ({ type, payload });
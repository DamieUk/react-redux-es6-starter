import _isString from 'lodash/isString';
import _round from 'lodash/round';
import _remove from "lodash/remove";

export const generateId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

export const required = (val) => {
  let value = val;
  if (_isString(value)) value = value.trim();
  return value ? undefined : 'Required';
};

export const phoneRequired = (val) => {
  return /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g.test(val) //eslint-disable-line no-useless-escape
    ? undefined
    : 'Wrong phone number';
};

export const emailValidate = val => {
  const result = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
  return result ? undefined : 'Invalid email';
};

export const comparePasswords = (primaryPass, secondaryPass) => {
  return primaryPass === secondaryPass ? undefined : 'Passwords does not match';
};

export const remCalc = px => `${_round(px / 16, 3)}rem`;

export const toggleMultiSelection = (state = [], val) => {
  state.includes(val) ? _remove(state, d => d === val) : state.push(val);
  return state
};

export const validator = {
	max255: val => val.length > 255 ? 'Maximum 255 characters' : undefined,
	max50: val => val.length > 50 ? 'Maximum 50 characters' : undefined,
	max20: val => val.length > 20 ? 'Maximum 20 characters' : undefined,
	max10: val => val.length > 10 ? 'Maximum 10 characters' : undefined,
	min8: val => val.length < 8 ? 'Minimum 8 characters' : undefined,
	email: emailValidate,
  phone: phoneRequired,
  required,
};

export const localStorageHelper = {
	set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
	remove: (key) => localStorage.removeItem(key),
	get: (key) => localStorage.getItem(key),
};

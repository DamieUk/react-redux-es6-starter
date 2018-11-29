import { generateId, toggleMultiSelection, validator, remCalc } from './helpers';

let defaultState = ['foo', 'rock', 'html'];

describe('common utility helper functions', function() {
	afterEach(() => defaultState = ['foo', 'rock', 'html']);
	
	it('should generate id', () => {
		expect(typeof generateId()).toBe('string');
		expect(generateId()).toHaveLength(36);
	});
	
	it('should toggleMultiSelection select correctly', () => {
		expect(toggleMultiSelection(defaultState, 'added')).toEqual(['foo', 'rock', 'html', 'added']);
	});
	
	it('should toggleMultiSelection deselect correctly', () => {
		expect(toggleMultiSelection(defaultState, 'rock')).toEqual(['foo', 'html']);
	});
	
	it('should validator work correctly', function() {
		expect(validator.required('')).toBe('Required');
		expect(validator.required(' ')).toBe('Required');
		expect(validator.required(0)).toBe('Required');
		expect(validator.required(null)).toBe('Required');
		expect(validator.required(undefined)).toBe('Required');
		expect(validator.required('mock-value')).toBe(undefined);
		expect(validator.email('fakemail@fake.com')).toBe(undefined);
		expect(validator.email('2345')).toBe('Invalid email');
		expect(validator.phone('13333333333')).toBe(undefined);
		expect(validator.phone('fakePhone')).toBe('Wrong phone number');
		expect(validator.phone('23333333333')).toBe('Wrong phone number');
	});
	
	it('should generate rem from px', function() {
		expect(remCalc(16)).toBe('1rem');
		expect(remCalc(14)).toBe('0.875rem');
		expect(remCalc(18)).not.toBe('1rem');
	});
});
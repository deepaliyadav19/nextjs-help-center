
import * as type from './type-util';

describe('type-util', () => {

	describe('isNull', () => {

		it('must return true if the passed value is null and false otherwise', () => {
			expect(type.isNull(null)).toBe(true);
			expect(type.isNull('foo')).toBe(false);
			expect(type.isNull({})).toBe(false);
			expect(type.isNull([])).toBe(false);
			expect(type.isNull(true)).toBe(false);
			expect(type.isNull(() => {})).toBe(false);
		});
	});

	describe('isDefined', () => {

		it('must return true if the passed value is defined and false otherwise', () => {
			expect(type.isDefined('foo')).toBe(true);
			expect(type.isDefined({})).toBe(true);
			expect(type.isDefined([])).toBe(true);
			expect(type.isDefined(true)).toBe(true);
			expect(type.isDefined(() => {})).toBe(true);
			expect(type.isDefined(undefined)).toBe(false);
		});
	});

	describe('isUndefined', () => {

		it('must return true if the passed value is undefined and false otherwise', () => {
			expect(type.isUndefined(undefined)).toBe(true);
			expect(type.isUndefined('foo')).toBe(false);
			expect(type.isUndefined({})).toBe(false);
			expect(type.isUndefined([])).toBe(false);
			expect(type.isUndefined(true)).toBe(false);
			expect(type.isUndefined(() => {})).toBe(false);
		});
	});

	describe('isObject', () => {

		it('must return true if the passed value is an object and false otherwise', () => {
			expect(type.isObject({})).toBe(true);
			expect(type.isObject([])).toBe(true);
			expect(type.isObject(window)).toBe(true);
			expect(type.isObject('foo')).toBe(false);
			expect(type.isObject(true)).toBe(false);
			expect(type.isObject(() => {})).toBe(false);
			expect(type.isObject(null)).toBe(false);
		});
	});

	describe('isFunction', () => {

		it('must return true if the passed value is a function and false otherwise', () => {
			expect(type.isFunction(() => {})).toBe(true);
			expect(type.isFunction({})).toBe(false);
			expect(type.isFunction([])).toBe(false);
			expect(type.isFunction('foo')).toBe(false);
			expect(type.isFunction(true)).toBe(false);
			expect(type.isFunction(undefined)).toBe(false);
		});
	});

	describe('isNumber', () => {

		it('must return true if the passed value is a number and false otherwise', () => {
			expect(type.isNumber(42)).toBe(true);
			expect(type.isNumber('42')).toBe(false);
			expect(type.isNumber({})).toBe(false);
			expect(type.isNumber([])).toBe(false);
			expect(type.isNumber(true)).toBe(false);
			expect(type.isNumber(() => {})).toBe(false);
		});
	});

	describe('isString', () => {

		it('must return true if the passed value is a string and false otherwise', () => {
			expect(type.isString('')).toBe(true);
			expect(type.isString('foo')).toBe(true);
			expect(type.isString({})).toBe(false);
			expect(type.isString([])).toBe(false);
			expect(type.isString(true)).toBe(false);
			expect(type.isString(undefined)).toBe(false);
		});
	});

	describe('isEmptyString', () => {

		it('must return true if the passed value is an empty string and false otherwise', () => {
			expect(type.isEmptyString('')).toBe(true);
			expect(type.isEmptyString('foo')).toBe(false);
			expect(type.isEmptyString({})).toBe(false);
			expect(type.isEmptyString([])).toBe(false);
			expect(type.isEmptyString(true)).toBe(false);
			expect(type.isEmptyString(undefined)).toBe(false);
		});
	});

	describe('isNonEmptyString', () => {

		it('must return true if the passed value is an empty string and false otherwise', () => {
			expect(type.isNonEmptyString('foo')).toBe(true);
			expect(type.isNonEmptyString('')).toBe(false);
			expect(type.isNonEmptyString({})).toBe(false);
			expect(type.isNonEmptyString([])).toBe(false);
			expect(type.isNonEmptyString(true)).toBe(false);
			expect(type.isNonEmptyString(undefined)).toBe(false);
		});
	});

	describe('isArray', () => {

		it('must return true if the passed value is an array and false otherwise', () => {
			expect(type.isArray([])).toBe(true);
			expect(type.isArray({})).toBe(false);
			expect(type.isArray('foo')).toBe(false);
			expect(type.isArray(true)).toBe(false);
			expect(type.isArray(undefined)).toBe(false);
			expect(type.isArray(() => {})).toBe(false);
		});
	});
});

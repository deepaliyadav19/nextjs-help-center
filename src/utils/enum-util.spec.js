
import { createEnum, isEnum } from './enum-util';

describe('enum-util', () => {

	describe('createEnum', () => {

		it('must return an object with the specified keys', () => {
			let Colors = createEnum({
				RED: { name: 'red' },
				GREEN: { name: 'green' },
				BLUE: { name: 'blue' }
			});
			expect(Colors).toMatchObject({
				RED: { key: 'RED', name: 'red' },
				GREEN: { key: 'GREEN', name: 'green' },
				BLUE: { key: 'BLUE', name: 'blue' }
			});
		});

		it('must accept an array of keys', () => {
			let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
			expect(Colors).toMatchObject({
				RED: { key: 'RED' },
				GREEN: { key: 'GREEN' },
				BLUE: { key: 'BLUE' }
			});
		});

		it('must allow numeric keys', () => {
			let Colors = createEnum({
				RED: { key: 0 },
				GREEN: { key: 1 },
				BLUE: { key: 2 }
			});
			expect(Colors).toMatchObject({
				RED: { key: 0 },
				GREEN: { key: 1 },
				BLUE: { key: 2 }
			});
		});

		it('must throw when the spec is invalid', () => {
			let INVALID_ARG = 'Enum argument must be an array or object';
			let INVALID_ARRAY = 'Enum array must contain only non-empty strings';
			expect(() => createEnum()).toThrow(INVALID_ARG);
			expect(() => createEnum(0)).toThrow(INVALID_ARG);
			expect(() => createEnum('Test')).toThrow(INVALID_ARG);
			expect(() => createEnum(null)).toThrow(INVALID_ARG);
			expect(() => createEnum(['One', 'Two', 3])).toThrow(INVALID_ARRAY);
			expect(() => createEnum(['One', '', 'Three'])).toThrow(INVALID_ARRAY);
		});

		describe('toString', () => {

			it('must return the key as a string for all enumerated values', () => {
				let Colors = createEnum({
					RED: { name: 'red' },
					GREEN: { name: 'green' },
					BLUE: { name: 'blue' }
				});
				expect(Colors.RED.toString()).toBe('RED');
				expect(Colors.GREEN.toString()).toBe('GREEN');
				expect(Colors.BLUE.toString()).toBe('BLUE');
			});

			it('must stringify numeric keys', () => {
				let Rank = createEnum({
					FIRST: { key: 0 },
					SECOND: { key: 1 },
					THIRD: { key: 2 }
				});
				expect(Rank.FIRST.toString()).toBe('0');
				expect(Rank.SECOND.toString()).toBe('1');
				expect(Rank.THIRD.toString()).toBe('2');
			});
		});

		describe('keys', () => {

			it('must return all enumerated string keys', () => {
				let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
				expect(Colors.keys()).toMatchObject([
					'RED',
					'GREEN',
					'BLUE'
				]);
			});

			it('must return all enumerated numeric keys', () => {
				let Rank = createEnum({
					FIRST: { key: 0 },
					SECOND: { key: 1 },
					THIRD: { key: 2 }
				});
				expect(Rank.keys()).toMatchObject([ 0, 1, 2 ]);
			});
		});

		describe('values', () => {

			it('must return all enumerated values', () => {
				let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
				expect(Colors.values()).toMatchObject([
					{ key: 'RED' },
					{ key: 'GREEN' },
					{ key: 'BLUE' }
				]);
			});
		});

		describe('includes', () => {

			it('must check whether a keys exists', () => {
				let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
				expect(Colors.includes('GREEN')).toBe(true);
				expect(Colors.includes('ORANGE')).toBe(false);
				expect(Colors.includes('constructor')).toBe(false);
				expect(Colors.includes('hasOwnProperty')).toBe(false);
			});

			it('must check whether a numeric key exists', () => {
				let Rank = createEnum({
					FIRST: { key: 0 },
					SECOND: { key: 1 },
					THIRD: { key: 2 }
				});
				expect(Rank.includes(0)).toBe(true);
				expect(Rank.includes(1)).toBe(true);
				expect(Rank.includes(3)).toBe(false);
			});
		});

		describe('fromKey', () => {

			it('must return the value from a string key', () => {
				let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
				expect(Colors.fromKey('RED')).toBe(Colors.RED);
				expect(Colors.fromKey('GREEN')).toBe(Colors.GREEN);
				expect(Colors.fromKey('BLUE')).toBe(Colors.BLUE);
				expect(Colors.fromKey('ORANGE')).toBe(undefined);
			});

			it('must return the value from a numeric key', () => {
				let Rank = createEnum({
					FIRST: { key: 0 },
					SECOND: { key: 1 },
					THIRD: { key: 2 }
				});
				expect(Rank.fromKey(0)).toBe(Rank.FIRST);
				expect(Rank.fromKey(1)).toBe(Rank.SECOND);
				expect(Rank.fromKey(2)).toBe(Rank.THIRD);
				expect(Rank.fromKey(3)).toBe(undefined);
			});
		});
	});

	describe('isEnum', () => {

		it('must determine whether a value is an enum', () => {
			let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
			let FakeEnum = {
				keys() {},
				values() {},
				includes() {},
				fromKey() {}
			};
			expect(isEnum(Colors)).toBe(true);
			expect(isEnum(FakeEnum)).toBe(false);
			expect(isEnum(null)).toBe(false);
			expect(isEnum(undefined)).toBe(false);
			expect(isEnum([1, 2, 3])).toBe(false);
		});
	});
});

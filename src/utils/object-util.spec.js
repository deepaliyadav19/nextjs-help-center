
import { resolveProp, merge } from './object-util';

describe('object-util', () => {

	describe('resolveProp', () => {

		let source;

		beforeEach(() => {
			source = {
				one: {
					two: {
						three: 'result'
					},
					wrong: undefined
				},
				wrong: null
			};
		});

		it('must parse an object property from a string representing the path in dot notation', () => {
			expect(resolveProp(source, '')).toBe(source);
			expect(resolveProp(source, 'one')).toBe(source.one);
			expect(resolveProp(source, 'one.two')).toBe(source.one.two);
			expect(resolveProp(source, 'one.two.three')).toBe(source.one.two.three);
		});

		it('must return an optional default value when an object property is null or undefined', () => {
			expect(resolveProp(source, 'wrong.two', 'default')).toBe('default');
			expect(resolveProp(source, 'one.wrong.three', 3)).toBe(3);
		});

		it('must return undefined when an object property is null or undefined', () => {
			expect(resolveProp(source, 'wrong.two')).toBe(undefined);
			expect(resolveProp(source, 'one.wrong.three')).toBe(undefined);
		});
	});

	describe('merge', () => {

		it('must not attempt to deep merge array values', () => {
			let firstObj = {
				list: [ 1, 2, 3 ]
			};
			let secondObj = {
				list: [ 4, 5, 6 ]
			};
			expect(merge({}, firstObj, secondObj)).toEqual(secondObj);
		});
	});
});

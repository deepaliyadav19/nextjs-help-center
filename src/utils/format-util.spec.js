
import * as format from './format-util';

describe('format-util', () => {

	describe('toFixedDigits', () => {

		it('must format the given number to a fixed number of digits', () => {
			expect(format.toFixedDigits(5, 2)).toBe('05');
			expect(format.toFixedDigits(11, 2)).toBe('11');
			expect(format.toFixedDigits('123', 6)).toBe('000123');
			expect(format.toFixedDigits('42', 2)).toBe('42');
		});

		it('must return the number as a string if it has more digits than the fixed amount', () => {
			expect(format.toFixedDigits(321, 2)).toBe('321');
			expect(format.toFixedDigits(1142, 2)).toBe('1142');
		});

		it('must return the number as a string if a fixed amount is not given', () => {
			expect(format.toFixedDigits(321)).toBe('321');
			expect(format.toFixedDigits(1142, NaN)).toBe('1142');
		});

		it('must return "NaN" if the given value can not be parsed as a number', () => {
			expect(format.toFixedDigits(NaN, 3)).toBe('NaN');
			expect(format.toFixedDigits('null', 3)).toBe('NaN');
			expect(format.toFixedDigits(null, 3)).toBe('NaN');
			expect(format.toFixedDigits({}, 3)).toBe('NaN');
		});
	});

	describe('toTimeStamp', () => {

		it('must format zero', () => {
			expect(format.toTimeStamp(0)).toBe('0:00');
		});

		it('must format positive numbers', () => {
			expect(format.toTimeStamp(9)).toBe('0:09');
			expect(format.toTimeStamp(10)).toBe('0:10');
			expect(format.toTimeStamp(60)).toBe('1:00');
			expect(format.toTimeStamp(134)).toBe('2:14');
		});

		it('must format negative numbers', () => {
			expect(format.toTimeStamp(-9)).toBe('-0:09');
			expect(format.toTimeStamp(-10)).toBe('-0:10');
			expect(format.toTimeStamp(-60)).toBe('-1:00');
			expect(format.toTimeStamp(-134)).toBe('-2:14');
		});

		it('must handle non-numeric values', () => {
			expect(format.toTimeStamp(undefined)).toBe('NaN');
			expect(format.toTimeStamp(null)).toBe('NaN');
			expect(format.toTimeStamp('string')).toBe('NaN');
			expect(format.toTimeStamp({})).toBe('NaN');
		});
	});
});

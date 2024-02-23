
import { parseFields } from './schema-util';
import { createEnum } from './enum-util';

describe('schema-util', () => {

	describe('parseFields', () => {

		it('must parse string date fields', () => {
			let data = { title: 'Test', startDate: '2017-07-28T11:23:09.000Z' };
			let fields = { startDate: 'date' };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				startDate: expect.any(Object)
			});
			expect(data.startDate.toISOString()).toBe('2017-07-28T11:23:09.000Z');
		});

		it('must parse unix date fields', () => {
			let data = { title: 'Test', startDate: 1483644602 };
			let fields = { startDate: 'unix' };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				startDate: expect.any(Object)
			});
			expect(data.startDate.toISOString()).toBe('2017-01-05T19:30:02.000Z');
		});

		it('must parse json fields', () => {
			let data = { title: 'Test', jsonData: '{"foo":"bar"}' };
			let fields = { jsonData: 'json' };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				jsonData: {
					foo: 'bar'
				}
			});
		});

		it('must not throw when parsing an invalid json string', () => {
			let data = { title: 'Test', jsonData: '{"invalid"}' };
			let fields = { jsonData: 'json' };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				jsonData: '{"invalid"}'
			});
		});

		it('must parse enum fields', () => {
			let Colors = createEnum(['RED', 'GREEN', 'BLUE']);
			let data = { title: 'Test', color: 'BLUE' };
			let fields = { color: Colors };
			parseFields(data, fields);
			expect(data.color).toBe(Colors.BLUE);
		});

		it('must parse fields in nested objects', () => {
			let data = { title: 'Test', model: { startDate: 1483644602 } };
			let fields = { model: { startDate: 'unix' } };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				model: {
					startDate: expect.any(Object)
				}
			});
			expect(data.model.startDate.toISOString()).toBe('2017-01-05T19:30:02.000Z');
		});

		it('must ignore null types', () => {
			let data = { title: 'Test', model: { startDate: 1483644602 } };
			let fields = { title: null, model: { startDate: null } };
			parseFields(data, fields);
			expect(data).toEqual({
				title: 'Test',
				model: {
					startDate: 1483644602
				}
			});
		});
	});
});

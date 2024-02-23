
import { composeInputHandlers } from './input-util';

describe('input-util', () => {

	describe('composeInputHandlers', () => {

		it('must return an object containing input handler functions', () => {
			let source = {};
			let handlers = composeInputHandlers(source);
			expect(handlers).toMatchObject({
				onChange: expect.any(Function),
				onBlur: expect.any(Function),
				onFocus: expect.any(Function)
			});
		});

		it('must return an onChange function that passes an event to the handler for each source', () => {
			let firstSource = {
				onChange: jest.fn(),
				onBlur: jest.fn(),
				onFocus: jest.fn()
			};
			let secondSource = {
				onChange: jest.fn(),
				onBlur: jest.fn(),
				onFocus: jest.fn()
			};
			let handlers = composeInputHandlers(firstSource, secondSource);
			let event = {};
			handlers.onChange(event);
			expect(firstSource.onChange).toHaveBeenCalledWith(event);
			expect(secondSource.onChange).toHaveBeenCalledWith(event);
			expect(firstSource.onBlur).not.toHaveBeenCalled();
			expect(secondSource.onBlur).not.toHaveBeenCalled();
			expect(firstSource.onFocus).not.toHaveBeenCalled();
			expect(secondSource.onFocus).not.toHaveBeenCalled();
		});

		it('must return an onFocus function that passes an event to the handler for each source', () => {
			let firstSource = {
				onFocus: jest.fn(),
				onChange: jest.fn(),
				onBlur: jest.fn()
			};
			let secondSource = {
				onFocus: jest.fn(),
				onChange: jest.fn(),
				onBlur: jest.fn()
			};
			let handlers = composeInputHandlers(firstSource, secondSource);
			let event = {};
			handlers.onFocus(event);
			expect(firstSource.onFocus).toHaveBeenCalledWith(event);
			expect(secondSource.onFocus).toHaveBeenCalledWith(event);
			expect(firstSource.onChange).not.toHaveBeenCalled();
			expect(secondSource.onChange).not.toHaveBeenCalled();
			expect(firstSource.onBlur).not.toHaveBeenCalled();
			expect(secondSource.onBlur).not.toHaveBeenCalled();
		});

		it('must return an onBlur function that passes an event to the handler for each source', () => {
			let firstSource = {
				onFocus: jest.fn(),
				onChange: jest.fn(),
				onBlur: jest.fn()
			};
			let secondSource = {
				onFocus: jest.fn(),
				onChange: jest.fn(),
				onBlur: jest.fn()
			};
			let handlers = composeInputHandlers(firstSource, secondSource);
			let event = {};
			handlers.onBlur(event);
			expect(firstSource.onBlur).toHaveBeenCalledWith(event);
			expect(secondSource.onBlur).toHaveBeenCalledWith(event);
			expect(firstSource.onChange).not.toHaveBeenCalled();
			expect(secondSource.onChange).not.toHaveBeenCalled();
			expect(firstSource.onFocus).not.toHaveBeenCalled();
			expect(secondSource.onFocus).not.toHaveBeenCalled();
		});

		it('must not throw when a source is missing a handler', () => {
			let source = {};
			let handlers = composeInputHandlers(source);
			expect(() => handlers.onChange()).not.toThrow();
			expect(() => handlers.onBlur()).not.toThrow();
			expect(() => handlers.onFocus()).not.toThrow();
		});
	});
});

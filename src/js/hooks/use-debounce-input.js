'use client'
import { useEffect, useState } from 'react';

/**
 * Uses state that syncs with memory.
 * To sync we just need to pass object with updated fields
 *
 * @example
 * <code>
 *     let debounceValue = useDebounce(searchValue, 500)
 * </code>
 *
 * @param   {String} value
 * @param {Object} delay
 * @returns {String}
 */

export function useDebounceInput(value = '', delay = 500) {
	const sanitizedValue = value?.replace(/'/g, '') || '';
	const [debouncedValue, setDebouncedValue] = useState(sanitizedValue);

	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedValue(sanitizedValue);
		}, delay);

		return () => {
			clearTimeout(id);
		};
	}, [sanitizedValue, delay]);

	return debouncedValue;
}

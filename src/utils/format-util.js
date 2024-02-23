
import { toast } from 'react-toastify';

import { isNumber } from './type-util';

/**
 * Formats a number into a string with fixed digits.
 *
 * @param   {Number} val        The numeric value to format.
 * @param   {Number} digits     The amount of fixed digits.
 * @returns {String}
 */
export function toFixedDigits(val, digits) {

	let result = String(val);
	digits = isNumber(digits) ? digits : 0;
	val = isNumber(val) ? val : parseInt(val, 10);

	if (isNumber(val) && !isNaN(val)) {

		result = String(val);

		while (result.length < digits) {
			result = '0' + result;
		}

		return result;
	}

	return 'NaN';
}

/**
 * Formats seconds into a time stamp.
 *
 * @param   {Number} seconds    The number of seconds to format.
 * @returns {String}
 */
export function toTimeStamp(seconds) {

	if (isNumber(seconds)) {

		let neg = seconds < 0;
		let min = Math.floor(Math.abs(seconds) / 60);
		let sec = Math.floor(Math.abs(seconds) % 60);

		return (neg ? '-' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;

	} else {

		return 'NaN';
	}
}
/**
	 * Formats a file form input.files to base 64.
	 *
	 * @param   {File} file    File form input.files
	 * @returns {Promise}
	 */

export function getFileBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export function getFileArrayBuffer(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

export function parseForBulkUpdate(formTable) {
	function getKeyVal(key, value) {
		if (typeof value === 'object') {
			if (value.key && value.value) {
				return { [key]: value.key };
			} else {
				let obj = {};
				for (let i in value) {
					obj = { ...obj, ...getKeyVal((key ? key + '.' : '') + i, value[i]) };
				}
				return obj;
			}
		} else {
			return { [key]: value.trim() };
		}
	}

	let result = {};

	for (let id in formTable) {
		result[id] = getKeyVal('', formTable[id]);
	}
	return result;
}

export function copyText(text, successMsg) {
	var input_temp = document.createElement('input');
	input_temp.value = text;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand('copy');
	document.body.removeChild(input_temp);
	toast.success((successMsg || 'Link copied to clipboard'), { autoClose: 2000, closeOnClick: true });
}

export function convertToPlainText(html) {
	var tempDivElement = document.createElement('div');

	tempDivElement.innerHTML = html;
	let innerText = tempDivElement.innerText;
	tempDivElement.remove();

	return innerText || '';
}

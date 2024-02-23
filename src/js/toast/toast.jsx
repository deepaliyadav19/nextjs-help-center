
import React from 'react';
import Icon from '@ant-design/icons';
import { toast, Slide } from 'react-toastify';

import style from './toast.scss';

const IconTypes = {
	success: 'check-circle',
	error: 'close-circle',
	warn: 'exclamation-circle',
	info: 'info-circle'
};

export function configureToast() {

	// @link https://github.com/fkhadra/react-toastify#api
	toast.configure({
		position: toast.POSITION.BOTTOM_RIGHT,
		transition: Slide,
		closeButton: false,
		hideProgressBar: true
	});

	let original = {};

	['info', 'success', 'warn', 'error'].forEach(type => {
		original[type] = toast[type];
		toast[type] = (content, options) => {
			let iconType = (options && options.loading) ? 'loading' : IconTypes[ type ];
			let iconTheme = (options && options.loading) ? 'outlined' : 'filled';
			let el = (
				<span>
					<Icon className={ style.icon } type={ iconType } theme={ iconTheme } />
					{ content }
				</span>
			);
			return original[type](el, options);
		};
	});

	original.update = toast.update;
	toast.update = (id, options) => {
		if (options.render) {
			let iconType = options.loading ? 'loading' : IconTypes[ options.type ];
			let iconTheme = options.loading ? 'outlined' : 'filled';
			options.render = (
				<span>
					<Icon className={ style.icon } type={ iconType } theme={ iconTheme } />
					{ options.render }
				</span>
			);
		}
		return original.update(id, options);
	};
}

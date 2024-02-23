
import React from 'react';
import Spin from 'antd/es/spin';
import PropTypes from 'prop-types';

import { useCurrentTheme } from '../../hooks';

import style from './spinner.scss';

function Spinner({ show, className, ...rest }) {
	const [theme] = useCurrentTheme();

	if (!show) {
		return null;
	}

	return (
		<div style={{ backgroundColor: theme === 'dark' ? '#0e1013' : '#fff' }} className={ className || style.container }>
			<Spin { ...rest } />
		</div>
	);
}

Spinner.propTypes = {
	show: PropTypes.bool,
	className: PropTypes.string
};

Spinner.defaultProps = {
	show: true
};

export default Spinner;

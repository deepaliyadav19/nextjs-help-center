import React from 'react';
import Tooltip from 'antd/es/tooltip';
import PropTypes from 'prop-types';

function TooltipHelp({ children, position, helpText = '', ...rest }) {

	const text = <span>{helpText}</span>;

	if (helpText) {
		return (
			<Tooltip placement={position || 'rightTop'} title={text} { ...rest }>
				{children}
			</Tooltip>
		);
	}

	return children;
}

TooltipHelp.propTypes = {
	helpText: PropTypes.oneOfType([PropTypes.string,PropTypes.node]),
	position: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']) ,
	children: PropTypes.node
};

export default TooltipHelp;

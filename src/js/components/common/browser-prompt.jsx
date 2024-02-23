
import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

function BrowserPrompt({ when, message }) {

	useEffect(() => {
		function onBeforeUnload(event) {
			event.preventDefault();
			event.returnValue = 'Changes you made may not be saved.';
		}
		if (when) {
			window.addEventListener('beforeunload', onBeforeUnload);
			return () => window.removeEventListener('beforeunload', onBeforeUnload);
		}
	}, [ when ]);

	return (
		<Prompt when={ when } message={ message } />
	);
}

BrowserPrompt.propTypes = {
	when: PropTypes.bool,
	message: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]).isRequired
};

export default BrowserPrompt;

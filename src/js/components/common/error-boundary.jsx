/* eslint-disable no-console */
import React from 'react';

import image from '../../../img/error.png';
import { responseError } from '../../utils/object-util';

import ErrorImage from './error-image';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		let ed = responseError(error);
		if (ed && ed.includes && (ed.includes('Loading chunk') || ed.includes('Loading CSS chunk'))) {
			console.log('Caught chunk error');
			window.location.reload();
		}
		console.log('getDerivedStateFromError >', error);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		let ed = responseError(error);
		if (ed && ed.includes && (ed.includes('Loading chunk') || ed.includes('Loading CSS chunk'))) {
			console.log('Caught chunk error-2');
			window.location.reload();
		}
		console.error('componentDidCatch >', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<ErrorImage image={image} type={'error'} />
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

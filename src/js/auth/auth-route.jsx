
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useCurrentUser } from '../hooks';

/**
 * Renders a route for a component that provides authentication.
 * The route will redirect to the app overview when authentication is not needed.
 *
 * @param   {Function} component
 * @param   {...*}     rest
 * @returns {Object}
 */
export function AuthRoute({ component: Component, ...rest }) {
	const [user] = useCurrentUser();
	let redirectPath = '/';

	let render = props => (
		user.isLoggedIn ? (
			<Redirect
				to={{
					pathname: redirectPath,
					state: { referrer: props.location }
				}}
			/>
		) : (
			<Component {...props} />
		)
	);

	return (
		<Route {...rest} render={render} />
	);
}

AuthRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	location: PropTypes.object
};

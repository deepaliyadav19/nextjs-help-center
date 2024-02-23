
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useCurrentUser } from '../hooks';

/**
 * Renders a route for a component that requires authentication.
 * The route will redirect to the login page when authentication is needed.
 *
 * @param   {Function} component
 * @param   {...*}     rest
 * @returns {Object}
 */
export function PrivateRoute({ component: Component, ...rest }) {
	const [user] = useCurrentUser();
	let render = props => {
		return (
			user.isLoggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { referrer: props.location }
					}}
				/>
			)
		);
	};

	return (
		<Route {...rest} render={render} />
	);
}

PrivateRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	location: PropTypes.object
};

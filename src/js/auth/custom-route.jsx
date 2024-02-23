import React from 'react';
import { Link } from 'react-router-dom';

import { isString } from '../utils/type-util';
import Store from '../global/store';
import { history } from '../../js/history';

export function CustomLink({ to, children, ...rest }) {
	return (
		<Link to={getLink(to)} {...rest}>{children}</Link>
	);
}

export function customHistoryPush(url, exact) {
	history.push(exact ? url : getLink(url));
}

export function customHistoryReplace(url, exact) {
	history.replace(exact ? url : getLink(url));
}

export function customLocationPathComparison(slug) {
	const moduleSlug = getModuleSlug();
	let isEqual = false;
	if (moduleSlug) {
		if (slug.startsWith(moduleSlug)) {
			isEqual = !!(slug === history.location?.pathname);
		} else {
			isEqual = !!((moduleSlug + slug) === history.location?.pathname);
		}
	} else {
		isEqual = ((moduleSlug + slug) === history.location?.pathname);
	}
	return isEqual;
}

function getModuleSlug() {
	let moduleSlug = (Store && Store.session && Store.session.selectedModule) ? ('/' + Store.session.selectedModule) : '';
	return moduleSlug;
}

function getLink(url) {
	const moduleSlug = getModuleSlug();

	if (moduleSlug && url) {
		if (isString(url) && !url.startsWith(moduleSlug)) {
			url = moduleSlug + url;
		} else if (url && url.pathname && isString(url.pathname) && !url.pathname.startsWith(moduleSlug)) {
			url.pathname = moduleSlug + url.pathname;
		}
	}
	return url;
}

export function getCustomLink(url) {
	return getLink(url);
}

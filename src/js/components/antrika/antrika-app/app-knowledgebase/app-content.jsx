
import React from 'react';
import PropTypes from 'prop-types';

import { useCurrentUser } from '../../../../hooks';

import style from './app-content.scss';

function AppContent({ knowledgeBase, children }) {
	const [user] = useCurrentUser();

	return (
		<section className={getClassNames({ knowledgeBase, isNotification: user?.notification, isBilling: user?.billingSideMenu })}>
			{ children }
		</section>
	);
}

function getClassNames({ knowledgeBase, isNotification, isBilling }) {
	if (knowledgeBase) {
		return style.content1;
	} else if (isNotification) {
		return style['content-with-header-notification'];
	} else if (isBilling) {
		return style['billing-side-menu'];
	} else {
		return style.content;
	}
}

AppContent.defaultProps = {
	showSideMenu: false
};

AppContent.propTypes = {
	children: PropTypes.node,
	knowledgeBase: PropTypes.bool,
	showSideMenu: PropTypes.bool
};

export default AppContent;

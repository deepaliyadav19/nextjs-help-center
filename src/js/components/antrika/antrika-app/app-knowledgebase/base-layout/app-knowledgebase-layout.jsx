
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Store from '../../../../../global/store';
import { AppContext } from '../../../../../global/context';
import PageNotFound from '../../page-not-found';
import AppContent from '../app-content';
import KnowledgeList from '../knowledge-base/knowledge-list';
import Knowledge from '../knowledge-base/knowledge';
import Category from '../category/category';
import OfflineNotification from '../offline-notification';

import AppKnowledgebaseFooter from './app-knowledgebase-footer';

function AppKnowledgebaseLayout() {

	const [user] = useState(Store.session);

	const [contentHeight, setContentHeight] = useState(document.documentElement.clientHeight);
	const [contentWidth, setContentWidth] = useState(document.documentElement.clientWidth);

	useEffect(() => {
		const callback = () => {
			setContentHeight(document.documentElement.clientHeight);
			setContentWidth(document.documentElement.clientWidth);
		};
		window.addEventListener('resize', callback);
		return () => window.removeEventListener('resize', callback);
	}, []);
	return (
		<AppContext.Provider value={{ user, contentHeight, contentWidth }}>
			<AppContent knowledgeBase={true}>
				<Switch>
					{/* <Redirect from='/' to='/list' exact /> */}
					<Route exact path='/list' component={KnowledgeList} />
					<Route path='/:kslug' exact component={Knowledge} />
					<Route path='/:kslug/:catslug' exact component={Category} />
					<Route path='/:kslug/:catslug/:artslug' exact component={Category} />
					<Route><PageNotFound hideHome={true} /></Route>
				</Switch>
			</AppContent>
			{contentWidth >= 768 &&
				<AppKnowledgebaseFooter />
			}
			<OfflineNotification />
		</AppContext.Provider>
	);
}

export default AppKnowledgebaseLayout;

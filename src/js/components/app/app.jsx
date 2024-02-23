import React, { useLayoutEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {
	StyleProvider,
	legacyLogicalPropertiesTransformer
} from '@ant-design/cssinjs';
import ConfigProvider from 'antd/es/config-provider';
import { useEffect } from 'react';

import { history } from '../../history';
import ErrorBoundary from '../common/error-boundary';
import { useFetch } from '../../hooks';
import { api } from '../../api/api';
import Spinner from '../common/spinner';
import Store from '../../global/store';
import { ThemeContext } from '../../global/context';
import {
	convertParamStringToObject
} from '../../utils/object-util';
import { setChatThemeDark, setChatThemeLight } from '../antrika/antrika-theme.jsx';
import AppKnowledgebaseLayout from '../antrika/antrika-app/app-knowledgebase/base-layout/app-knowledgebase-layout.jsx';
import PageNotFound from '../antrika/antrika-app/page-not-found.jsx';

function App() {
	return (
		<Compatible>
			<PrivateAppRoute />
		</Compatible>
	);
}

function Compatible({ children }) {
	const [theme, setTheme] = useState('');

	const syncTheme = data => {
		setTheme(data);
	};

	useLayoutEffect(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (prefersDarkMode) {
			setTheme('dark');
			setChatThemeDark();
		} else {
			setTheme('light');
			setChatThemeLight();
		}
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, syncTheme }}>
			<StyleProvider
				hashPriority='high'
				transformers={[legacyLogicalPropertiesTransformer]}
			>
				<ConfigProvider
					theme={{
						hashed: false
					}}
				>
					{children}
				</ConfigProvider>
			</StyleProvider>
		</ThemeContext.Provider>
	);
}

function PrivateAppRoute() {
	const { widget = '', secret = '', token = '' } = convertParamStringToObject(history.location.search);
	const res = useFetch({
		request: api.hostInfo,
		dontCall: widget
	});
	useEffect(() => {
		if (widget && secret) {
			Store.host = { widgetId: widget, widgetSecret: secret, token };
		}
	}, [widget, secret]);

	if (res.loading) {
		return <Spinner show={true} />;
	}

	try {
		if (res.data?.s) {
			Store.host = res.data;
		}
	} catch (error) {
		res.refresh();
		return <Spinner show={true} />;
	}

	return (
		<>
			{res.data?.appTypeValue === 'KNOWLEDGE_BASE' && <Knowledgebase />}
		</>
	);
}

function Knowledgebase() {
	Store.config = Store.host;
	(function () {
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = Store.host.favLogo;
		document.getElementsByTagName('head')[0].appendChild(link);

		var title = document.createElement('title');
		title.innerHTML = Store.host.companyName;
		document.getElementsByTagName('head')[0].appendChild(title);
	})();
	return (
		<Router history={history}>
			{/* <Suspense fallback={<Spinner show={true} />}> */}
			<ErrorBoundary>
				<Switch>
					{/* <Redirect exact from='/' to='/knowledgebase' /> */}
					<Route path='/' component={AppKnowledgebaseLayout} />
					<Route path='/forbidden' component={PageNotFound} />
				</Switch>
			</ErrorBoundary>
			{/* </Suspense> */}
		</Router>
	);
}

export default App;

import axios from 'axios';

import { authService } from '../auth/auth-service';
import Store from '../global/store';
import { isNotEmptyObject } from '../utils/type-util';
import { convertParamStringToObject } from '../utils/object-util';

import SHA256 from './SHA256';

// const kAppId = '57ab57bb2a3a8s0b7193b5f0';
// const kAppSecret = '2a63b9q3-9545-41e1-b4bd-2f4f1a10fef3';
// const kCert = 'v/a1Vojb/YSZCUwK29zinPZvUSU=';

const dev = process.env.NODE_ENV !== 'production';

const paramsSerializer = params =>
	Object.entries(params).map(([key, value]) =>
		key + '=' + (value || '')).join('&') || '';

export const http = axios.create({
	paramsSerializer
});

http.interceptors.request.use(config => {
	let securityHeaders = {};
	const timeStamp = Date.now().toString();
	const userHeaders = {
		'Content-Type': 'application/json',
		// 'platform': 'WEB_V2',
		'vname': '20.6',
		'App_Version_Name': '16.1',
		'vcode': '1',
		'App_Version_Code': '1',
		'crs': 'true',
		// 'tlk-type': 'EMP_V2',
		// 'tlk-type': 'VEHICLE',
		'tlp-t': timeStamp,
		'tlp-tz': Intl.DateTimeFormat().resolvedOptions().timeZone
		// 'act-dev': 'fjekk221443'
	};

	http.defaults.timeout = 15000;
	const { widget = '' } = convertParamStringToObject(location.search);

	if ((Store.isHost() && Store.isConfig() && config.url !== Store.host.configApi) || (Store.isHost() && Store.host.appTypeValue === 'CUSTOMER_ENGAGEMENT') || widget) {

		let url;
		if (Store.isConfig()) {
			url = Store.config.urls && Store.config.urls[config.url];
		}
		if (url && url.timeOut && (!config.timeout || config.timeout === http.defaults.timeout)) {
			http.defaults.timeout = url.timeOut;
			config.timeout = url.timeOut;
		}
		if (Store.isConfig()) {
			if (Store.isHost() && !Store.host.knowledgebase && Store.config.urls[config.url]) {
				config.url = Store.config.urls[config.url].url;
			}
		}
		if (Store.isHost() && Store.host.knowledgebase && dev) {
			userHeaders['account-host'] = 'knowldgebase.trackwick.com';
		}
		if (Store.isHost() && Store.host?.appId && Store.host.appTypeValue === 'CUSTOMER_ENGAGEMENT') {
			userHeaders['tlp-aid'] = Store.host.appId;
		}
		userHeaders['tlk-type'] = Store.host?.appTypeValue;

		let securityToken;
		if (Store.isHost()) {
			if (Store.host?.widgetId) {
				securityToken = timeStamp;
			} else {
				securityToken = Store.host.appId + timeStamp;
			}
		}

		config.params = isNotEmptyObject(config.params) ? { ...config.params } : {};
		if (config.params || (Store.isHost() && Store?.host?.widgetId)) {
			if (Store.isHost() && Store?.host?.widgetId) {
				config.params.widget_id = Store.host.widgetId;
			}
			if (Store.isHost() && Store?.host?.token) {
				config.params.ssoToken = Store.host.token;
			}
			let params = paramsSerializer(config.params);
			if (params) {
				securityToken += config.url + (config.url.includes('?') ? '&' : '?') + params;
			} else {
				securityToken += config.url;
			}
		} else {
			securityToken += config.url;
		}
		if (Store.isHost()) {
			if (Store.host?.widgetId && Store.host?.widgetSecret) {
				securityToken += Store.host.widgetSecret;
			} else {
				securityToken += Store.host.appSecret;
			}
		}
		if (config.method.toLowerCase() === 'post' && !config.params?.uploadingMultiPart) {
			securityToken += JSON.stringify(config.data);
		}
		if (Store.isHost() && Store.host.platformSecret) {
			securityToken += Store.host.platformSecret;
		}
		let sha = new SHA256(
			'SHA-256',
			'TEXT',
			{ numRounds: 1 }
		);
		sha.update(securityToken);
		if (Store.isHost() && !Store.host?.widgetId) {
			userHeaders.platform = 'WEB_V2';
		}
		securityHeaders = {
			'tlp-k': sha.getHash('B64')
		};
		if (dev) {
			// console.log('<<<<<<< SECURITY TOKEN >>>>>>>>> \n', securityToken);
		}
	} else {
		config.url = config.url;
		if (Store.isHost()) {
			userHeaders['tlk-type'] = Store.host.appTypeValue;
		}
		userHeaders['platform'] = 'WEB_V2';
		userHeaders['web-token'] = '4G8f9PzYrLDNpk63';
	}

	if (dev) {
		// local server proxy on /api, see webpack.config.js
		config.url = 'https://app.dev.antrika.com' + config.url;
		userHeaders['account-host'] = 'local.dev.antrika.io';
		// userHeaders['account-host'] = 'deepali-antrika.dev.antrika.io';
	}
	config.headers = {
		...config.headers,
		...userHeaders,
		...securityHeaders
	};
	return config;
}, error => Promise.reject(error));

http.interceptors.response.use(response => {
	if (response.data && !response.data.s && response.data.rc === 500 && Store.isHost() && Store.host.appTypeValue !== 'CUSTOMER_ENGAGEMENT') {
		if (authService.isAuthenticated()) {
			authService.logout();
		}
	}
	if (response?.headers?.antrikaloggedout === 'true') {
		localStorage.setItem('isLogout', 'true');
	}
	return response;
});

'use client'
import Axios from 'axios';

import { isNotEmptyObject } from '../utils/type-util';

import { http } from './http';

export const api = {

	signup: {
		captchaRefresh(params) {
			return http.get('registration/captcha/refresh', { params });
		}
	},

	hostInfo() {
		return http.get('/emp/1/web/host/info');
	},

	login(data, params) {
		return http.post('/emp/1/antrika/user/login', data, { params });
	},

	captchaRefresh(params) {
		return http.get('captcha/refresh', { params });
	},

	s3MultipartUpload(data, params, onUploadProgress) {
		return http.post(`image/upload`, data, {
			params: isNotEmptyObject(params)
				? { ...params, uploadingMultiPart: true }
				: { uploadingMultiPart: true },
			onUploadProgress
		});
	},

	s3MultipartMultipleUpload(data, params, onUploadProgress) {
		return http.post(`image/upload/multiple`, data, {
			params: isNotEmptyObject(params)
				? { ...params, uploadingMultiPart: true }
				: { uploadingMultiPart: true },
			onUploadProgress
		});
	},

	callPostwithParams({ url, params, data }, responseType) {
		return http.post(url, data, { params, responseType });
	},

	driverUpload({ url, data, params, onUploadProgress }, responseType) {
		return http.post(url, data, {
			params: isNotEmptyObject(params)
				? { ...params, uploadingMultiPart: true }
				: { uploadingMultiPart: true },
			onUploadProgress,
			responseType
		});
	},

	callGet({ url, ...params }) {
		return http.get(url, { params });
	},

	callPost({ url, data }) {
		return http.post(url, data);
	},

	callPostwithParams({ url, params, data }, responseType) {
		return http.post(url, data, { params, responseType });
	},

	callGetwithParams({ url, params }, responseType) {
		return http.get(url, { params, responseType });
	},

	callPostWithMockandAPI({ url, params, data }, responseType) {
		if (url?.startsWith('https://run.mocky.io/')) {
			return Axios.get(url);
		}
		return http.post(url, data, { params, responseType });
	},

	callGetWithMockandAPI({ url, params }, responseType) {
		if (url?.startsWith('https://run.mocky.io/')) {
			return Axios.get(url);
		}
		return http.get(url, { params, responseType });
	},
	knowledgeBase: {
		knowledge: {
			getAll() {
				return http.get('/emp/1/portal/knowledgebase/list');
			}
		},
		category: {
			getAll(params) {
				return http.get('/emp/1/portal/category/list', { params });
			}
		},
		helpCenter: {
			getAll(params) {
				return http.get('/emp/1/portal/collection/list', { params });
			}
		},
		article: {
			getAll(params) {
				return http.get('/emp/1/portal/article/list', { params });
			},
			getBySlug(params) {
				return http.get('/emp/1/portal/article/get', { params });
			},
			getCount(params) {
				return http.get('/emp/1/portal/article/click', { params });
			}
		},
		helpCenterDetail: {
			getAll(params) {
				return http.get('/emp/1/portal/collection/detail', { params });
			}
		}
	}
};

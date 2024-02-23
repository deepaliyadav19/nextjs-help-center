
import { api } from '../api';
import Store from '../global/store';
import { resolveProp } from '../utils/object-util';

export const authService = {

	isAuthenticated() {
		if (Store.isConfig()) {
			return resolveProp(Store, 'config.loggedIn', false);
		}
		return false;
	},

	login(data, params) {
		return api.login(data, params);
		// .then(response => {
		// 	if (response.data.s) {
		// 		localStorage.setItem('user', 'logged in!');
		// 	}
		// 	return response;
		// });
	},

	logout() {
		// localStorage.removeItem('user');
		localStorage.clear();
	}
};

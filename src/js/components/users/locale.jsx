import { useCurrentUser } from '../../hooks';

function Locale({ name, title }) {

	let [user] = useCurrentUser();

	let value = title;

	if (user) {
		if (user.localeData && user.localeData[name]) {
			value = user.localeData[name];
		} else if (user.locale && user.locale[name]) {
			value = user.locale[name];
		}
	}
	return value;
}
export default Locale;

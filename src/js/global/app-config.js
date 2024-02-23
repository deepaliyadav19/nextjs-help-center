const AppConfig = Object.freeze({

	dev: process.env.NODE_ENV !== 'production',
	host: 'dev.trackwick.com'
});

export default AppConfig;

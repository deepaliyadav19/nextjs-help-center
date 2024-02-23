const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://app.dev.antrika.com', // Specify your target server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Rewrite the path if necessary
      },
    })
  );
};

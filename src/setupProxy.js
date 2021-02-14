/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

// * https://create-react-app.dev/docs/proxying-api-requests-in-development/
module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.DEV_PROXY_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    })
  );
};

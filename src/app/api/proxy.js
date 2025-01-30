const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: process.env.API_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

module.exports = (req, res) => apiProxy(req, res);

const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "https://comptearebours-a15a75eeaba9.herokuapp.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

module.exports = (req, res) => apiProxy(req, res);

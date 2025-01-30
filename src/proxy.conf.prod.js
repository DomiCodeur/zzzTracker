module.exports = {
  "/api": {
    "target": process.env.API_URL,
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
};

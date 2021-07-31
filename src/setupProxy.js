// 配置代理，解决跨域
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:4000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
    })
  );
};

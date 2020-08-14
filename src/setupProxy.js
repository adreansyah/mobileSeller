const proxy = require("http-proxy-middleware");
module.exports = function expressMiddleware(app) {
  app.use(
    proxy(["/api"], {
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true
    })
  );
};

const proxy = require('http-proxy-middleware');

// @ts-ignore
module.exports = function (app) {
  app.use(
    proxy('/api',{
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
      ))
};

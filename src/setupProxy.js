// const proxy = require('http-proxy-middleware');

// // @ts-ignore
// module.exports = function (app) {
//   app.use(
//     proxy('/api',{
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//       }
//       ))
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('反向代理');
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    })
  );
};

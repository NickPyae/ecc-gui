const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/exchange',
    proxy({
      target: 'http://10.244.14.32:3090/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/exchange': '/'
      }
    })
  );

  app.use(
    '/agent',
    proxy({
      target: 'http://10.244.14.32:3510',
      changeOrigin: true,
      pathRewrite: {
        '^/agent': '/'
      }
    })
  );
};

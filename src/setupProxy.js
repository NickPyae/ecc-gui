const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/v1',
    proxy({
      target: 'http://192.168.1.55:8080',
      changeOrigin: true
    })
  );
};

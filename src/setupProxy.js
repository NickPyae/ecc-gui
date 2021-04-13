const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/v1',
    proxy({
      target: 'https://10.244.14.32:3090',
      changeOrigin: true
    })
  );
};

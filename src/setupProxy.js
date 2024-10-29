const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/ws', // Điều chỉnh tùy thuộc vào URL bạn cần chuyển hướng
    createProxyMiddleware({
      target: 'ws://localhost:3005', // Địa chỉ và cổng của máy chủ WebSocket
      ws: true, // Cho phép WebSocket
      changeOrigin: true, // Thay đổi nguồn gốc của yêu cầu
      secure: false, // Không sử dụng giao thức HTTPS
    })
  );
};

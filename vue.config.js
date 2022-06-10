module.exports = {
  devServer: {
    open: true,
    proxy: {
      "^/app": {
        ws: true, //是否启用websockets
        changeOrigin: true, //开启代理： 在本地会创建一个虚拟服务端，然后发送请求数据，并且同时接收请求数据，这样客户端和服务端进行数据的交互就不会有跨域问题
        target: "http://api-toutiao-web.itheima.net/app", // 要访问的跨域的域名
      },
    },
  },

  lintOnSave: false,
};

// 每次调用接口前会先调用ajaxPrefilter() 这个函数
// 在这个函数中，我们可以拿到给AJAX中提供的配置对象
$.ajaxPrefilter(function (options) {
  // 再发起真正的 Ajax 前，统一拼接请求的跟路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
})
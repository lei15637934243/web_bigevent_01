// 每次调用接口前会先调用ajaxPrefilter() 这个函数
// 在这个函数中，我们可以拿到给AJAX中提供的配置对象
$.ajaxPrefilter(function (options) {
  // 再发起真正的 Ajax 前，统一拼接请求的跟路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 统一为有权限的接口设置 headers请求头
  // indexOf() 方法可以反会某个指定字符串中首次出现的位置，如果没有找到匹配的字符串则返回的是 -1
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  //全局统一挂载 complete 回调函数  不论成功还是失败都会调用 
  options.complete = function (res) {
    // console.log(res);
    // 在cmpelete 回调函数中，可以使用res.responseJSON 拿到服务器返回的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清空 token
      localStorage.removeItem('token');
      // 重新跳转到登录页面
      location.href = '/login.html'
    }
  }


}) 
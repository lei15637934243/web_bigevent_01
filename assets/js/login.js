$(function () {
  // 注册帐号的链接
  $('#link_reg').on('click', function () {
    // 点击去注册显示注册盒子隐藏登录盒子
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 登录的链接
  $('#link_login').on('click', function () {
    // 点击登录 显示登录隐藏注册
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 通过 layui 获取form属性
  var form = layui.form
  // 通过layui 获取 layer属性
  var layer = layui.layer

  form.verify({
    //  自定义一个密码 校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) { // value 的值是通过形参拿到确认密码框中的值
      // 获取第一次输入的密码的值
      var pwd = $('.reg-box [name=password]').val();
      // 用第一次输入的值跟第二次作比较
      if (pwd !== value) return '两次密码输入不一致'
    }
  })


  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    var data = {
      // 获取用户输入的用户名跟密码
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    // 发起ajax请求
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 成功后 模拟人的点击行为
      $('#link_login').click()
      //  注册成功后 清空注册表单的数据
      $('#form_reg')[0].reset()
    })
  })

  //监听表单登录的提交事件
  $('#form_login').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/login',
      // this 指向当前表单 serialize() 方法快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('登陆成功！')
        // console.log(res.token);
        // token 用来标识用户是否登录的令牌，后台的页面需要用户登录之后才能查阅，那么权限校验的机制也就出来了，需要检验权限的页面后台先判断请求头里面是否有token，以此来判断是否是登录状态
        // 将成功登录后 token 保存到 localStorage 中
        localStorage.setItem('token', res.token);
        //登录成功后 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

})


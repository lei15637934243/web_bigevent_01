$(function () {
  var form = layui.form
  var layer = layui.layer

  // 定义自己的校验规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间'
      }
    }
  })

  // 调用获取用户信息的函数
  initUserInfo()
  // 获取用户信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        // console.log(res);
        //  给表单赋值  formUserInfo 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        // res.data 就是要给的值
        //  传递属性的值 必须和表单元素的name值保持一致
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止按钮的默认重置行为
    e.preventDefault()
    // 重新调用一次用户的信息
    initUserInfo()
  })

  //  监听更新用户表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      //  serialize() 快速获取当前表单的值
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 更新成功后调用父页面中的方法 重新渲染用户的头像和用户信息
        window.parent.getUserInfo()
      }
    })
  })

})
$(function () {
  var layer = layui.layer
  var form = layui.form
  // 定义一个密码的校验规则
  form.verify({
    // 验证旧密码
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //  验证新密码
    somepwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能一样'
      }
    },
    // 验证确认新密码
    repwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码输入不一致'
      }
    }
  })

  // 给form表单绑定提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止默认提交事件、
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      // 获取当前表单的数据 
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }
        // 重置表单 reset() 方法可以把表单元素恢复为默认值
        $('.layui-form')[0].reset()
        layer.msg('更新密码成功！即将退出登录', function () {
          // 强制清空 token
          localStorage.removeItem('token');
          // 重新跳转到登录页面
          window.parent.location.href = '/login.html'
        })

      }
    })
  })

})
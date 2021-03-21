$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 10 || value.length < 1) {
                return '用户昵称必须在1~10个字符之间';
            }
        }
    });
    //获取用户信息
    getUserInfo();
    //从新设置重置
    $('#resetBtn').on('click', function(e) {
        e.preventDefault();
        getUserInfo();
    });
    //修改用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('不开心。。', { icon: 2 });
                }
                layer.msg('修改成功', { icon: 1 });
                window.parent.getUserInfo();
            }
        });
    });
});

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                return '获取用户信息失败';
            } else {
                // $('#username').val(res.data.username);
                // $('#nickname').val(res.data.nickname);
                // $('#email').val(res.data.email);
                var form = layui.form;
                form.val('userForm', res.data);
            }
        }
    });
}
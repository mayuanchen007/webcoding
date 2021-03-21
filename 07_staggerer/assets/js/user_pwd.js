$(function() {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        somepwd: function(value) {
            if (value === $('[name=password]').val()) {
                return '新密码不能与原密码一致';
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次密码不一致';
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败', { icon: 2 });
                } else {
                    layer.msg('修改成功', { icon: 1 });
                    $('.layui-form')[0].reset();
                }
            }
        });
    });
});
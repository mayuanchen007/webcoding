$(function() {
    //调用获取用户基本信息方法
    getUserInfo();
    //设置退出功能
    var layer = layui.layer;
    $('#logout').on('click', function() {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清除localstorage
            localStorage.removeItem('token');
            //跳转页面
            window.location = '/07_staggerer/login.html';

            layer.close(index);
        });
    });
});
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            } else {
                //登录成功，渲染用户头像
                renderAvatar(res.data);
            }
        },
        error: function() {
            return layui.layer.msg('调用接口失败');
        }
    });
}
//渲染用户头像
function renderAvatar(data) {
    var username = data.nickname || data.username;
    $("#welcome").html('欢迎' + username);
    if (data.user_pic) {
        $('.layui-nav-img').attr("src", data.user_pic);
        $('.text-avatar').hode();
        $('.layui-nav-img').show();
    } else {
        var firstCode = username.substring(0, 1).toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').show();
        $('.text-avatar').html(firstCode);
    }
}
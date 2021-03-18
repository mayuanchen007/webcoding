//注意每次调用$.get() 或 $.post 或 $.ajax() 
//都会调用 ajaxPrefilter 这个函数
//这个函数中我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        console.log(res.responseJSON.status);
        console.log(res.responseJSON.message === '身份认证失败！');
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            window.location = '/07_staggerer/login.html';
        }
    }

})
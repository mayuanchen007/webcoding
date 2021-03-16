$(function() {
    //调用获取用户基本信息方法
    getUserInfo();
});
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res);
        }
    });
}
$(function() {
    //定义一个参数对象
    //获取列表数据
    initTable();
});

function initTable() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败', { icon: 6 });
            }
            console.log(res);
            layer.msg('获取文章列表成功', { icon: 6 });
            var html = template('wzlist', res);
            $("tbody").html(html);
        }
    });
}
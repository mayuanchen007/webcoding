$(function() {
    initArtCateList();
    $('#btnAddCate').on('click', function() {
        layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $('#add').html()
        });

    });
});

function initArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('查询出错', { icon: 5 });
            }
            var html = template('catelist', res);
            $('.layui-card-body').html(html);
        }
    });
}
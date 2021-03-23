$(function() {
    initArtCateList();
    var form = layui.form;
    var index = null;
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $('#add').html()
        });
    });
    //添加
    $('body').on('submit', '.layui-form', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败', { icon: 2 });
                }
                layer.msg('添加成功', { icon: 1 });
                initArtCateList();
                layer.close(index);
            }
        });
    });
    //编辑
    var editIndex = null;
    $('.layui-card-body').on('click', '#editBtn', function() {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章类别',
            content: $('#edit').html()
        });
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('查询出错', { icon: 5 });
                }
                form.val('editForm', res.data);
            }
        });
    });
    //修改
    $('body').on('submit', '#editForm', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改出错', { icon: 2 });
                }
                layer.msg('修改成功', { icon: 1 });
                initArtCateList();
                layer.close(editIndex)
            }
        });
    });
    //删除
    $('.layui-card-body').on('click', '#delBtn', function() {
        var id = $(this).attr('data-id');
        console.log(id);
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败，' + res.message, { icon: 2 });
                    }
                    layer.msg('删除分成功', { icon: 1 });
                    initArtCateList();
                    layer.close(index);
                }
            });


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
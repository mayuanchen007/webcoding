var form = layui.form;
$(function() {
    initcate();
    // 初始化富文本编辑器
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImg').on('click', function() {
        $("#coverFile").click();
    });
    $("#coverFile").on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return layer.msg('有表情地提示', { icon: 6 });
        }
        var file = files[0];
        var imgUrl = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    //默认文章发布状态
    var art_state = "已发布";
    $('#btnsave1').on('click', function() {
        art_state = '草稿';
    });
    $("#from-pub").on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        var img = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
            });
        fd.forEach(function(i, v) {
            console.log(v);
        });
        fd.append('cover_img', img);
        console.log(fd);
        publishArt(fd);
    });
});

function initcate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('有表情地提示', { icon: 6 });
            }
            console.log(res);
            var html = template('cateList', res);
            $('[name=cate_id]').html(html);
            form.render();
        }
    });
}

function publishArt(fd) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('发布文章失败', { icon: 6 });
            }
            layer.msg('发布文章成功', { icon: 6 });
            window.href = "./article/art_list.html";
        }
    });
}
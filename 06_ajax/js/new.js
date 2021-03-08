$(function() {
    getNewList();
});

function getNewList() {
    $.get('http://www.liulongbin.top:3006/api/news', function(res) {
        if (res.status !== 200) {
            return alert('获取新闻列表数据失败')
        }
        console.log(res);
        let dataArr = res.data;
        console.log(dataArr);
        let htmlStr = template('tpl-news', res);
        console.log(htmlStr);
        $(".news-list").html(htmlStr);
    });
}
template.defaults.imports.formate = function(value) {
    let time = new Date(value);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    return y + '年' + m + '月' + d + '日';
}
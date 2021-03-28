const db = require('../db/index');


//获取文章分类
module.exports.getArticleCates = (req, resp) => {
    const query = `select * from ev_article_cate`;
    db.query(query, (err, res) => {
        if (err) return resp.cc('查询文章类型出错');
        if (res.length < 1) return resp.cc('查询文章类型为空');
        return resp.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: res
        })
    });
}

//新增文章分类
module.exports.addArticleCates = (req, resp) => {
    const query = `select '文章名字与别名已被占用' from ev_article_cate where name=? and alias=?
    UNION
    select '文章名字与别名分别被占用' from ev_article_cate where name=? or alias=?
    union
    select '文章名字已被占用' from ev_article_cate where name=? and alias!=? 
    UNION
    select '文章别名已被占用' from ev_article_cate where name!=? and alias=? 
    `;
    db.query(query, [req.body.name, req.body.alias, req.body.name, req.body.alias, req.body.name, req.body.alias, req.body.name, req.body.alias], (err, res) => {
        if (err) resp.cc("新增分类失败");
        if (res.length !== 0) resp.cc(res[0]);
    });
    //执行添加
    const insert = ` insert into ev_article_cate  set ?`;
    db.query(insert, req.body, (err, res) => {
        if (err) return resp.cc(err.message);
        if (res.affectedRows !== 1) return resp.cc('新增文章列表失败');
        return resp.cc("新增文章列表成功", 0);
    });
}

//删除文章分类
module.exports.deleteCateById = (req, resp) => {
    const query = `update ev_article_cate set is_del=1 where id=?`;
    db.query(query, req.param, (err, res) => {
        if (err) return resp.cc(err.message);
        if (res.affectedRows !== 1) return resp.cc('删除文章列表失败');
        return resp.cc("删除文章列表成功", 0);
    });
}
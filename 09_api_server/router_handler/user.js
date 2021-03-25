const db = require("../db/index");
const bcrypt = require('bcryptjs');
//注册
exports.reguser = (req, resp) => {
    let userinfo = req.body;
    console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        resp.cc("用户名或者密码不合法！");
    }
    //检查用户名是否被占用
    const querysql = "select 1 from ev_user where username=?";
    db.query(querysql, userinfo.username, function(err, res) {
        if (err) {
            return resp.cc(err);
        }
        if (res.length > 0) {
            return resp.cc("用户名被占用，请更换其他用户名");
        }
    });
    //密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    //新增用户
    const addUser = "insert into ev_user set ?";
    db.query(addUser, { username: userinfo.username, password: userinfo.password }, (err, res) => {
        if (err) {
            return resp.cc("注册用户失败");
        }
        return resp.cc("注册用户成功", 0)

    });
}

//登录
exports.login = (req, resp) => {
    resp.send('登录成功')
}
//数据库对象
const db = require("../db/index");
//密码加密
const bcrypt = require('bcryptjs');
//导入生成token的包
const jwt = require('jsonwebtoken');
//导入配置文件
const config = require('../config')

//注册
exports.reguser = (req, resp) => {
    let userinfo = req.body;
    console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        return resp.cc("用户名或者密码不合法！");
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
    const userinfo = req.body;
    let querySql = `select * from ev_user where username=?`;
    db.query(querySql, userinfo.username, (err, result) => {
        console.log(result.length !== 1);
        if (err) { return resp.cc("登录失败"); }
        if (result.length !== 1) return resp.cc("登录失败");
        //判断用户密码是否正确
        const repassword = bcrypt.compareSync(userinfo.password, result[0].password);
        if (!repassword) {
            return resp.cc("输入密码错误");
        }
        //在服务器端生成Token
        const user = {...result[0], password: '', user_pic: '' };
        console.log(user);
        console.log(user);
        const tokenStr = jwt.sign(user, config.jwtKey, { expiresIn: config.timeToken });
        resp.send({
            status: 0,
            message: '登录成功',
            token: "Bearer " + tokenStr
        });
    });


}
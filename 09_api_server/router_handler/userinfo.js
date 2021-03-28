//导入db
const db = require('../db/index');
const bcryptjs = require('bcryptjs');
//查询用户信息
module.exports.getUserInfo = function(req, resp) {
    const query = "select * from ev_user where id=?";
    db.query(query, req.user.id, (err, res) => {
        if (err) return resp.cc('查询用户方法出错');
        if (res.length !== 1) return resp.cc('没有此用户');
        return resp.send({
            status: 0,
            message: "查询用户成功",
            data: res[0]
        });
    });

}

//更新用户信息

module.exports.updateUserInfo = (req, resp) => {
    const query = `update ev_user set ? where id=?`;
    db.query(query, [req.body, req.body.id], (err, res) => {
        if (err) return resp.cc('更新用户失败1');
        if (res.affectedRows !== 1) return resp.cc('更新用户失败');
        resp.send('更新成功');
    });


}

//更改密码
module.exports.updatepwd = (req, resp) => {
    //查询用户是否存在
    const query = `select * from ev_user where id=?`;
    db.query(query, req.user.id, (err, res) => {
        if (err) return resp.cc("查询用户方法出错");
        if (res.length !== 1) return resp.cc("无此用户");
        //判断旧密码是否正确
        const flag = bcryptjs.compareSync(req.body.oldPwd, res[0].password);
        if (!flag) return resp.cc('旧密码错误');
        const query = 'update ev_user set password=? where id=?';
        //加密
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
        db.query(query, [newPwd, req.user.id], (err, res) => {
            if (err) return resp.cc("修改密码方法出错");
            if (res.affectedRows !== 1) return resp.cc("修改密码出错");
            resp.cc("更新密码成功", 0);
        });
    });
}

//更改头像
module.exports.updateAvatar = (req, resp) => {
    const query = `update ev_user set user_pic=? where id=?`
    db.query(query, [req.body.avatar, req.user.id], (err, res) => {
        if (err) return resp.cc('修改用户错误');
        if (res.affectedRows !== 1) return resp.cc('修改用户错误');
        resp.cc("修改用户头像成功", 0);
    });

}
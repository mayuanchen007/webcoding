const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'mmyc',
    resave: false,
    saveUninitialized: true
}));
app.post('/user', (req, resp) => {
    if (req.body.username != 'zhangsan' && req.body.password != 123) {
        resp.send("登录失败");
    }
    //往session里边存数据
    req.session.user = req.body;
    resp.session.isLogin = true;
});
app.get('/user', (req, resp) => {
    if (!req.session.isLogin) {
        resp.send({
            "code": 0,
            "status": "fail"
        });
    } else {
        resp.send({
            "code": 1,
            "status": "success"
        });
    }
});
app.get('out', (req, resp) => {
    req.session.destroy();
    resp.send("退出成功");
});
const express = require('express');
const cors = require('cors');
const joi = require('@hapi/joi')

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//封装res.cc函数
app.use((req, resp, next) => {
    resp.cc = function(err, status = 1) {
        resp.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    }
    next();
});
//配置解析token的中间件
const expressJwt = require('express-jwt');
const config = require('./config');
app.use(expressJwt({ secret: config.jwtKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));
//导入用户路由---注册登录模块
const userRouter = require("./router/user")
app.use('/api', userRouter);
//用户信息模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);
//文章类型模块
const artcate = require('./router/artcate');
app.use('/my', artcate);
//错误中间件
app.use(function(err, req, resp, next) {
    //数据验证错误类型
    if (err instanceof joi.ValidationError) {
        return resp.cc(err);
    }
    //未知错误
    return resp.cc(err);
});

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
});
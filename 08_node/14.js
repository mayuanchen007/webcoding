//1.导入express 模块
const express = require('express');
//2.创建路由对象
const route = express.Router();
//3.挂载get路由
route.get('/user', (req, resp) => {
    console.log(req.params);
    console.log(req.query);
    resp.send("get 请求");
});
//4.挂载post路由
route.post("/user", (req, resp) => {
    console.log(req.params);
    console.log(req.query);
    resp.send("post 请求");
});
//5.将路由对象暴露在外部
module.exports = route;
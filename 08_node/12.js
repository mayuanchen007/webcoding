//加载express模块
const express = require('express');
//获取server对象
const app = express();
//get请求
app.get("/user", (req, resp) => {
    console.log(req.query);
    resp.send({ "name": "黎明", "age": 18, "mag": req.query });
});
//post请求
app.post("/user", (req, resp) => {
    resp.send("收到请求");
});
//启动server
app.listen(80, () => {
    console.log("express server 启动--------");
});
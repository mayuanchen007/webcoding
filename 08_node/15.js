const express = require('express');
const app = express();
//注册路由模块
const router = require('./14');
//挂载中间件
app.use('/router', router);
app.listen(80, () => {
    console.log('启动server....');
});
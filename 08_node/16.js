const express = require('express');
const mw = function(req, resp, next) {
    console.log("这是一个中间件函数");
    //调用next流转到下一个中间件或者路由
    next();
}
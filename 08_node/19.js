const express = require('express');
const app = express();
const vm1 = function(req, resp, next) {
    console.log('这是局部中间件1');
    next();
}
const vm2 = function(req, resp, next) {
    console.log('这是局部中间件2');
    next();
}
app.get('/', [vm1, vm2], (req, resp) => {
    resp.send("路由器");
});
app.listen(80, () => {
    console.log('server start');
});
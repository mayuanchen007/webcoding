const express = require('express');
const app = express();
const mv = function(req, resp, next) {
    console.log("第一个中间件");
    req.startTime = new Date();
    next();
}
app.use(mv);
app.use((req, resp, next) => {
    console.log("第二个中间件");
    console.log(req.startTime);
    next();
});
app.get('/', (req, resp) => {
    console.log(req.startTime);
    resp.send("这是一个路由");
});
app.listen(80, () => {
    console.log("server  start......");
});
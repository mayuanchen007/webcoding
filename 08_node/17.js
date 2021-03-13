const express = require('express');
const app = express();
const vm = function(req, resp, next) {
    console.log('这是一个中间件');
    next();
}
app.use(vm);
app.get("/", (req, resp) => {
    resp.send("home")
});
app.get("/user", (req, resp) => {
    resp.send("user")
});
app.listen(80, () => {
    console.log('server start..........');
});
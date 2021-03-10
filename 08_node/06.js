//1.导入http模块
const http = require('http');
//2.创建server对象
const server = http.createServer();
//绑定 request response 对象
server.on('request', (req, resp) => {
    //1.获取请求的url地址
    const url = req.url;
    //2.设置默认响应内容为404
    let content = '<h1>404 Not found！</h1>';
    //3.判断请求地址
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>';
    }
    resp.setHeader('Content-Type', 'text/html; charset=utf-8');
    resp.end(content);
});
//启动服务器
server.listen(80, () => {
    console.log("server 启动。。。。。。。。。。。。");
})
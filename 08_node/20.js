const express = require('express');
const qs = require('querystring');
const app = express();
const vm = function(req, resp, next) {
    let str = '';
    req.on('data', (a) => {
        str += a;
    });
    req.on('end', () => {
        const body = qs.parse(str);
        req.body = body;
        next();
    });
}
app.use(vm);
app.post('/', (req, resp) => {
    console.log(req.body);
    resp.send(req.body);
});

app.listen(80, () => {
    console.log('server start......');
});
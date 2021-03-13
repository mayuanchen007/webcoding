const express = require('express');
const app = express();
app.get('/user/:id/:name', (req, resp) => {
    console.log(req.params); //{ id: '78', name: 'zhanhsna' }
});
app.listen(80, () => {
    console.log('server 启动=======');
})
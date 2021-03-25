const express = require('express');
const cors = require('cors')

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//封装res.cc函数
app.use((req, resp, next) => {
    resp.cc = function(err, status = 1) {
        resp.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    }
    next();
});

const userRouter = require("./router/user")
app.use('/api', userRouter);

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
});
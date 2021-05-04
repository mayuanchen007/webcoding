const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mybatis'
});
app.use(express.static('../10_vue'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
router.get('/books', (req, resp) => {
    const query = 'select id,create_time date,name from book';
    db.query(query, (err, res) => {
        if (err) return err.message;
        resp.send(res)
    });
});
app.use(router);
app.listen(3001, () => {
    console.log('server is start');
});
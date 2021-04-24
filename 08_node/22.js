const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/book/:id', function(req, resp) {
    console.log(req.params);
    resp.send(req.params);
});
app.get("/book", (req, resp) => {
    console.log(req.query.info);
    resp.send(req.query.info);
});
app.delete('/book/:id', function(req, resp) {
    resp.send(req.params);
});
app.post("/people", function(req, resp) {
    resp.send(req.body.name);
});
app.listen(3007, () => {
    console.log('server is running');
});
const express = require('express');
const router = express.Router();
const user = require('../router_handler/user')
    //注册
router.post('/reguser', user.reguser);
router.post('/login', user.login);
module.exports = router;
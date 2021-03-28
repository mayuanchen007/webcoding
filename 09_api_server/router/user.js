const express = require('express');
//获得路由对象
const router = express.Router();
//获得用户路由方法
const user = require('../router_handler/user');
const expressJoi = require('@escook/express-joi');
//导入需要验证的规则对象
const { reg_login_schema } = require('../schema/user')

//注册
router.post('/reguser', expressJoi(reg_login_schema), user.reguser);
//登录
router.post('/login', user.login);
module.exports = router;
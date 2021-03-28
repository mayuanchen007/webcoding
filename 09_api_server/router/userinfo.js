const express = require('express');
const router = express();
//导入验证规则
const express_joi = require('@escook/express-joi');
const userInfo = require('../router_handler/userinfo');
//查询用户信息
router.get('/userinfo', userInfo.getUserInfo);
//更新用户信息
// 导入验证模块
const { update_userinfo } = require('../schema/user');
router.post('/userinfo', express_joi(update_userinfo), userInfo.updateUserInfo);
//更改密码
const { update_pwd, update_avatar } = require('../schema/user');
router.post('/updatepwd', express_joi(update_pwd), userInfo.updatepwd);

//更改用户头像
router.post('/update/avatar', express_joi(update_avatar), userInfo.updateAvatar);
module.exports = router;
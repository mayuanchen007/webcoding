//导入验证规则的包
const joi = require('@hapi/joi');

//定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(20).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();


//定义验证注册和登录表单数据的规则对象
module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//定义id ,nickname,email的验证规则
const id = joi.number().integer().required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();
module.exports.update_userinfo = {
    body: {
        id,
        nickname,
        email: user_email
    }
}

//定义更改密码的校验规则
module.exports.update_pwd = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 定义头像验真规则
const avatar = joi.string().required().dataUri();
module.exports.update_avatar = {
    body: {
        avatar
    }
}
const joi = require('@hapi/joi');

const name = joi.string().required();
const alias = joi.string().required().alphanum();

module.exports.cates_schema = {
    body: {
        name,
        alias
    }
}
const id = joi.number().integer().min(1);
module.exports.del_cate = {
    params: {
        id
    }
}
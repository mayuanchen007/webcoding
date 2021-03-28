const express = require('express');
const router = express();

const express_joi = require('@escook/express-joi');
const { cates_schema, del_cate } = require('../schema/artcate');
//查询文章分类
const artcate = require('../router_handler/artcate')
router.get('/article/cates', artcate.getArticleCates);
// 新增文章分类
router.post('/article/addcates', express_joi(cates_schema), artcate.addArticleCates);
// 删除文章分类
router.get('/deletecate/:id', express_joi(del_cate), artcate.deleteCateById);
module.exports = router;
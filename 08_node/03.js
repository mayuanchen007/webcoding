//1.导入fs文件系统模块
const fs = require("fs");
//2.调用方法，写入文件的内容
/**
 * 参数1：表示文件的存放路径
 * 参数2：表示要写入的内容
 * 参数3：回调函数
 * 
 */
fs.writeFile('2.txt', "hello node.js", 'utf-8', function(err) {
    if (err) {
        //如果失败 打印失败原因
        console.log(err.message);
    } else {
        console.log('写入成功');
    }
});
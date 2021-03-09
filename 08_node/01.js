//1.导入fs模块，来操作文件
const fs = require('fs');
//2.调用 fs.readFile()方法读取文件
/**
 * 参数1：读取文件的存放路径
 * 参数2：读取文件时候采用的编码格式，一般指的utf-8
 * 参数3：回调函数，拿到读取失败和成功的结果 err dataStr
 */
fs.readFile("1.tx2t", 'utf-8', function(err, dataStr) {
    //打印失败的结果 ，如果成功为 null
    //失败返回错误对象
    /**
     * [Error: ENOENT: no such file or directory, open 'E:\study\vscodeSpace\0001\08_node\1.tx2t']
     *  {
     *  errno: -4058,
     *  code: 'ENOENT',
     *  syscall: 'open',
     *  path: 'E:\\study\\vscodeSpace\\0001\\08_node\\1.tx2t'
     *  }
     */
    console.log(err);

    //文件内容
    console.log(dataStr);
});
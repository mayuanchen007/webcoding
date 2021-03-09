const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname + "/3.txt"), 'utf-8', function(err, data) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
        let arr = data.split(' ');
        let newArr = [];
        arr.forEach(item => {
            newArr.push(item.replace('=', ':'))
        });
        let newStr = newArr.join(' ');
        console.log(newStr);
        fs.writeFile(path.join(__dirname, "4.txt"), newStr, function(err) {
            if (err) {
                console.log('写入失败，原因是：' + err.message);
            } else {
                console.log("写入成功");
            }
        })
    }
});
console.log(__dirname);
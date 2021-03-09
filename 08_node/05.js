const fs = require('fs');
const path = require('path');

const regStyle = /<style>[sS]*<\/style> /;
const regScript = /<script>[sS]*<\/script>/;

fs.readFile(path.join(__dirname, "/01.html"), 'utf-8', (err, data) => {
    if (err) return console.log("读取失败，原因" + err.message);

});
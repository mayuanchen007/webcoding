const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname, "/01.html"), 'utf-8', (err, data) => {
    if (err) return console.log("读取失败，原因" + err.message);
    //分解css
    resolveCss(data);
    //分解js
    resolveJS(data);
    //分解html
    resolveHtml(data);
});

function resolveCss(data) {
    const r1 = regStyle.exec(data);
    const newStr = r1[0].replace("<style>", '').replace("</style>", '');
    fs.writeFile(path.join(__dirname, "/index.css"), newStr, err => {
        if (err) return console.log("解析css错误，原因：" + err.message);
    })
}

function resolveJS(data) {
    const r1 = regScript.exec(data);
    const newStr = r1[0].replace('<script>', '').replace('</script>', '')
    fs.writeFile(path.join(__dirname, "index.js"), newStr, err => {
        if (err) return console.log("解析js错误，原因：" + err.message);

    })
}

function resolveHtml(data) {
    const str = data.replace(regStyle, `<link rel="stylesheet" href="index.css">`)
        .replace(regScript, `<script src="index.js"></script>`);
    fs.writeFile(path.join(__dirname, "/index.html"), str, err => {
        if (err) return console.log("01" + err.message);
    });
}
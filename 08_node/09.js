 const m = require('./08');

 function time() {
     let date = new Date();
     let y = date.getFullYear();
     let m = date.getMonth();
     let d = date.getDate();
     let h = date.getHours();
     let mm = date.getMinutes();
     let s = date.getSeconds();
     return `${y}年${m}月${d}日  ${h}时${mm}分${s}秒`;
 }
 module.exports = {
     time
 }
import $ from 'jquery'
import './css/01.css'
import './less/01.less'
// $("li").each(function(index, ele) {
//     if (index % 2 == 0) {
//         $(ele).css('background-color', "red")
//     }
// });
$("li:odd").css("background-color", "yellow");
$("li:even").css("background-color", "red");

class Person {
    static name = 'lisi'
}
import app from './component/01.vue'
import Vue from 'vue'
new Vue({
    el: '.app',
    render: h => h(app)

})
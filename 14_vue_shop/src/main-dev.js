import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../plugins/element'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

import nProgress from 'nprogress'

axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token');
    nProgress.start();
    return config;
})

axios.interceptors.response.use(config => {
    return config;
})

Vue.prototype.$http = axios;
import { Message } from 'element-ui';
Vue.use(ElementUI);
Vue.prototype.$message = Message;
import { MessageBox } from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm;

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable);

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */ )
    // import echarts from 'echarts'
    // Vue.use(echarts)
    //时间过滤器
Vue.filter("dataFormat", function(date) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const mouth = (dt.getMonth() + 1 + "").padStart(2, '0');
    const day = (dt.getDate() + "").padStart(2, '0');
    const h = (dt.getHours() + "").padStart(2, '0');
    const f = (dt.getMinutes() + "").padStart(2, '0');
    const s = (dt.getSeconds() + "").padStart(2, '0');
    return year + "-" + mouth + "-" + day + " " + h + ":" + f + ":" + s;
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
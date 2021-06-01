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
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token');
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
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
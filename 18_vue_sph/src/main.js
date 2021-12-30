import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
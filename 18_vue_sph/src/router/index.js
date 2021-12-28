import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

let originPush = VueRouter.prototype.push;

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
};

Vue.use(VueRouter)

const routes = [
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/search/:keywords?', component: Search, meta: { show: true }, name: 'search', props: true },
    { path: '/register', component: Register, meta: { show: false } },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '*', redirect: '/home' }
]

const router = new VueRouter({ routes })
export default router
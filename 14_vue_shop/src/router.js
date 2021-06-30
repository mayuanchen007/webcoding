import Vue from 'vue'
import Router from 'vue-router'
//import login from ''
const login = () =>
    import ( /* webpackChunkName: "login-home-welcome" */ './components/login')

//mport home from './components/home'
const home = () =>
    import ( /* webpackChunkName: "login-home-welcome" */ './components/home')

//import welcome from './components/welcome'
const welcome = () =>
    import ( /* webpackChunkName: "login-home-welcome" */ './components/welcome')

import users from './components/users'
import rights from './components/power/rights'
import roles from './components/power/roles'
import cate from './components/goods/cate'
import params from './components/goods/params'
import goods from './components/goods/goods'
import addGoods from './components/goods/add'
import order from './components/order/order'
import report from './components/report/report'
Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/home',
            name: 'home',
            component: home,
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    name: 'welcome',
                    component: welcome
                },
                {
                    path: '/users',
                    name: users,
                    component: users
                },
                {
                    path: '/rights',
                    name: rights,
                    component: rights
                },
                {
                    path: '/roles',
                    name: roles,
                    component: roles
                },
                {
                    path: '/categories',
                    name: cate,
                    component: cate
                },
                {
                    path: '/params',
                    name: params,
                    component: params
                },
                {
                    path: '/goods',
                    name: goods,
                    component: goods
                },
                {
                    path: '/goods/add',
                    component: addGoods
                },
                {
                    path: '/orders',
                    component: order
                },
                {
                    path: '/reports',
                    component: report
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    const token = window.sessionStorage.getItem('token');
    if (!token) return next('/login');
    next();
});

export default router;
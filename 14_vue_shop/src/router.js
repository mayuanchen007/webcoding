import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import home from './components/home'
import welcome from './components/welcome'
import users from './components/users'
import rights from './components/power/rights'
import roles from './components/power/roles'
import cate from './components/goods/cate'
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
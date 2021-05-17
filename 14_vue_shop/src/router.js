import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import home from './components/home'
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
            component: home
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
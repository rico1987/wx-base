import Vue from 'vue';
import Router from 'vue-router';
import PasswordLogin from '@/views/PasswordLogin.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'PasswordLogin',
            component: PasswordLogin,
        },
    ],
});

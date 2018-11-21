import Vue from 'vue';
import Router from 'vue-router';
import Registration from '@/views/Registration.vue';
import PasswordLogin from '@/views/PasswordLogin.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'PasswordLogin',
            component: PasswordLogin,
        },
        {
            path: '/register',
            name: 'register',
            component: Registration,
        },
    ],
});

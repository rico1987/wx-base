import Vue from 'vue';
import Router from 'vue-router';
import Registration from '@/views/Registration.vue';
import PasswordLogin from '@/views/PasswordLogin.vue';
import Binding from '@/views/Binding.vue';
import Info from '@/views/Info.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import PasswordLessLogin from '@/views/PasswordLessLogin.vue';

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
        {
            path: '/binding',
            name: 'binding',
            component: Binding,
        },
        {
            path: '/info',
            name: 'info',
            component: Info,
        },
        {
            path: '/reset-password',
            name: 'resetPassword',
            component: ResetPassword,
        },
        {
            path: '/password-less',
            name: 'passwordLessLogin',
            component: PasswordLessLogin,
        },
    ],
});

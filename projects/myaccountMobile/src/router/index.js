import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/views/SignUp.vue';
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
            path: '/signup',
            name: 'signUp',
            component: SignUp,
        },
    ],
});

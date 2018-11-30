import Vue from 'vue';
import Router from 'vue-router';
import Registration from '@/views/Registration.vue';
import PasswordLogin from '@/views/PasswordLogin.vue';
import BindEmail from '@/views/BindEmail.vue';
import BindPhone from '@/views/BindPhone.vue';
import Info from '@/views/Info.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import PasswordLessLogin from '@/views/PasswordLessLogin.vue';
import Setting from '@/views/Setting.vue';
import Orders from '@/views/Orders.vue';
import AccountMenu from '@/views/AccountMenu.vue';
import WorkList from '@/views/WorkList.vue';
import UnlimitedVip from '@/views/UnlimitedVip.vue';
import SubmitTicket from '@/views/SubmitTicket.vue';
import FindPassword from '@/views/FindPassword.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'login',
        },
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
            path: '/bind-email',
            name: 'bindEmail',
            component: BindEmail,
        },
        {
            path: '/bind-phone',
            name: 'bindPhone',
            component: BindPhone,
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
        {
            path: '/setting',
            name: 'setting',
            component: Setting,
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
        },
        {
            path: '/account-menu',
            name: 'accountMenu',
            component: AccountMenu,
        },
        {
            path: '/work-list',
            name: 'workList',
            component: WorkList,
        },
        {
            path: '/unlimited-vip',
            name: 'unlimitedVip',
            component: UnlimitedVip,
        },
        {
            path: '/submit-ticket',
            name: 'submitTicket',
            component: SubmitTicket,
        },
        {
            path: '/find-password',
            name: 'findPassword',
            component: FindPassword,
        },
    ],
});

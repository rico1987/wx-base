import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../layout/layout.vue';

let home = require('../pages/Home.vue');
let login = require('../pages/Login.vue');
let register = require('../pages/Register.vue');

Vue.use(Router);

export default [{
    path: '/',
    component: Layout,
    children: [
        {
            path: '',
            component: r => require.ensure([], () => r(home), 'home'),
        }, {
            path: '/login',
            component: r => require.ensure([], () => r(login), 'login'),
        }, {
            path: '/register',
            component: r => require.ensure([], () => r(register), 'register'),
        },
    ],
},
];

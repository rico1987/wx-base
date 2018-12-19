import Vue from 'vue';
import Router from 'vue-router';
import Faq from '@/views/Faq.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'faq',
        },
        {
            path: '/faq',
            name: 'Faq',
            component: Faq,
        },
    ],
});

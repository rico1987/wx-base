import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/views/Home.vue';
import QrCode from '@/views/pages/QrCode.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'qrcode',
        },
        {
            path: '/qrcode',
            name: 'qrcode',
            component: QrCode,
            meta: {
                bodyWidth: '900px',
                bodyHeight: '612px',
            },
        },
    ],
});

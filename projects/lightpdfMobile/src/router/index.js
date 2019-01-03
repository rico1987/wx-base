import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import FromPdf from '@/views/frompdf.vue';
import ConvertList from '@/views/convert.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'home',
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/frompdf',
            name: 'frompdf',
            component: FromPdf,
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertList,
        },
    ],
});

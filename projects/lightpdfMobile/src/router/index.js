import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import FromPdf from '@/views/frompdf.vue';
import ToPdf from '@/views/toPdf.vue';
import ConvertList from '@/views/convert.vue';
import MergePdfTab from '@/views/mergePdf.vue';

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
            path: '/topdf',
            name: 'topdf',
            component: ToPdf,
        },
        {
            path: '/mergepdf',
            name: 'mergepdf',
            component: MergePdfTab,
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertList,
        },
    ],
});

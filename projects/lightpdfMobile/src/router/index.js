import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import FromPdf from '@/views/frompdf.vue';
import ToPdf from '@/views/toPdf.vue';
import ConvertList from '@/views/convert.vue';
import MergePdfTab from '@/views/mergePdf.vue';
import ConvertResult from '@/views/convertResult.vue';
import Info from '@/views/info.vue';
import Myfiles from '@/views/myFiles.vue';
import pay from '@/views/pay.vue';
import VipPay from '@/views/vipPay.vue';
import ToPdfConvert from '@/views/toPdfConvert.vue';
import Merge from '@/views/merge.vue';
import FeedBack from '@/views/feedback.vue';

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
            path: '/topdfconvert',
            name: 'topdfconvert',
            component: ToPdfConvert,
        },
        {
            path: '/mergepdf',
            name: 'mergepdf',
            component: MergePdfTab,
        },
        {
            path: '/merge',
            name: 'merge',
            component: Merge,
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertList,
        },
        {
            path: '/convertresult',
            name: 'convertresult',
            component: ConvertResult,
        },
        {
            path: '/info',
            name: 'info',
            component: Info,
        },
        {
            path: '/myfiles',
            name: 'myfiles',
            component: Myfiles,
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay,
        },
        {
            path: '/vippay',
            name: 'vippay',
            component: VipPay,
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: FeedBack,
        },
    ],
});

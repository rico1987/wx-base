import Vue from 'vue';
import Router from 'vue-router';
import VideoEditor from '@/views/VideoEditor.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'editor',
        },
        {
            path: '/editor',
            name: 'VideoEditor',
            component: VideoEditor,
        },
    ],
});

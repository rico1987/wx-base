import Vue from 'vue';
import Router from 'vue-router';
import Player from '@/views/Main.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'player',
        },
        {
            path: '/player',
            name: 'Player',
            component: Player,
        },
    ],
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { MdButton, MdContent, MdTabs, } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App, },
    template: '<App/>',
});

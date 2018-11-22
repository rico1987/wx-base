// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import ToastPlugin from './plugins/toast';

Vue.use(ToastPlugin, { position: 'center', });

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'zh': {
            hello: '你好',
        },
        'en': {
            hello: 'hello',
        },
    },
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App, },
    template: '<App/>',
});

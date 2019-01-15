// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import Cookies from 'js-cookie';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import trans from './utils/trans';
import { getQueryValue, } from './utils/index';
import ls from './utils/littleStore';

// import languages
import LangEn from './lang/en';
import LangZh from './lang/zh';
import LangCs from './lang/cs';
import LangDa from './lang/da';
import LangDe from './lang/de';
import LangEl from './lang/el';
import LangEs from './lang/es';
import LangFi from './lang/fi';
import LangFr from './lang/fr';
import LangHu from './lang/hu';
import LangIt from './lang/it';
import LangJa from './lang/ja';
import LangNl from './lang/nl';
import LangNo from './lang/no';
import LangPl from './lang/pl';
import LangPt from './lang/pt';
import LangSv from './lang/sv';
import LangTr from './lang/tr';
import LangTw from './lang/tw';

import ToastPlugin from './plugins/toast';

Vue.use(ToastPlugin, { position: 'center', });

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(trans);

let lang = getQueryValue('lang') || 'en';

(function(doc, win) {
    let docEl = doc.documentElement;
    let psdWidth;
    let fontSize;
    let clientWidth;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = function() {
        clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        psdWidth = 720;
        // 750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿
        // 如果设计师给的1920的psd，自己用ps等比例缩小
        fontSize = 100 * (clientWidth / psdWidth);
        docEl.style.fontSize = `${fontSize}px`;
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

let identity_token = getQueryValue('identity_token') || '';
ls.set('identity_token', identity_token);

// 路由守护
// router.beforeEach((to, from, next) => {
//     if (Cookies.get('identity_token') && Cookies.get('api_token')) {
//         if (!identity_token) {
//             if (to.name === 'PasswordLogin') {
//                 next({
//                     path: '/account-menu',
//                     query: { lang, },
//                 });
//             } else {
//                 next();
//             }
//         } else {
//             if (to.name === 'accountMenu') {
//                 next();
//             } else {
//                 next({
//                     path: '/account-menu',
//                     query: { lang, },
//                 });
//             }
//         }
//     } else {
//         if (identity_token) {
//             store.dispatch('LoginByToken', {
//                 identity_token: identity_token.replace(/%2c/gi, ','),
//                 language: lang,
//             })
//                 .then(() => {
//                     next({
//                         path: '/account-menu',
//                         query: { lang, },
//                     });
//                 })
//                 .catch(() => {
//                     next({
//                         path: '/login',
//                         query: { lang, },
//                     });
//                 });
//         } else {
//             if (to.name === 'PasswordLogin' || to.name === 'register' || to.name === 'passwordLessLogin' || to.name === 'findPassword') {
//                 next();
//             } else {
//                 next({
//                     path: '/login',
//                 });
//             }
//         }
//     }
// });

const i18n = new VueI18n({
    locale: lang,
    messages: {
        'zh': LangZh,
        'en': LangEn,
        'cs': LangCs,
        'da': LangDa,
        'de': LangDe,
        'el': LangEl,
        'es': LangEs,
        'fi': LangFi,
        'fr': LangFr,
        'hu': LangHu,
        'it': LangIt,
        'ja': LangJa,
        'nl': LangNl,
        'no': LangNo,
        'pl': LangPl,
        'pt': LangPt,
        'sv': LangSv,
        'tr': LangTr,
        'tw': LangTw,
    },
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App, },
    template: '<App/>',
});

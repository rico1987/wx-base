// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VConsole from 'vconsole';
// import Cookies from 'js-cookie';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import trans from './utils/trans';
import { getQueryValue, } from './utils/index';
import ls from './utils/littleStore';
import { startWith, looseIndexOf, } from '../../../lib/utils/index';
import vip from './utils/vipInfo';

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
import price from './utils/iosPrice';

let isDebugger = 0;// 1 打开debugger 0 关闭
if (isDebugger) {
    const vConsole = new VConsole();
    console.log(vConsole.version);
}
vip.init();
vip.freshIdentityToken();
Vue.use(ToastPlugin, { position: 'center', });

price.init();
window.price = price;

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(trans);
let lang = getQueryValue('lang');
let lsLang = ls.get('ls-lang');
if (!lang && lsLang) {
    lang = lsLang;
} else if (!lang && !lsLang) {
    lang = 'en';
}
let supportLangArr = ['cn', 'tw', 'en', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'nl', 'nb', 'pl', 'pt', 'sv', 'tr', ];

if (startWith(lang, 'zh')) {
    if (lang === 'zh') {
        lang = 'cn';
    } else {
        lang = lang.split('_')[1].toLowerCase();
    }
} else {
    lang = lang.split('_')[0].toLowerCase();
}
if (looseIndexOf(supportLangArr, lang) === -1) {
    lang = 'en';
}

ls.set('ls-lang', lang);

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

let info = `{"api_token":"4816931,cefe66cde5ade2c014e344a192a86583",
"identity_token":"4816931,1547717295,06759405ad51e6eacc382e585f512d18",
"userInfo":{"user_id":4816931,"brand":"Apowersoft","nickname":"3004197106",
"avatar":"https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882",
"country_code":null,"telephone":"","language":"en","email":"3004197106@qq.com",
"registed_app":"lightmake.test","created_at":1533275172,"last_login_time":1547640197,
"is_auto_user":0,"is_verified":1,"first_name":"","last_name":"","gender":0,"birthday":"",
"company":"","industry":"","position":"","education":"","address":"","city":"","postcode":"","country":""}}`;
window.uinfo = JSON.parse(info);

const i18n = new VueI18n({
    locale: lang,
    messages: {
        'cn': LangZh,
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

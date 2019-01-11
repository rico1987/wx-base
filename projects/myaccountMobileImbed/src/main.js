// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import { getNativeData, getQueryValue, } from './utils/index';

// import languages
import LangEn from './lang/en.json';
import LangZh from './lang/zh.json';
import LangCs from './lang/cs.json';
import LangDa from './lang/da.json';
import LangDe from './lang/de.json';
import LangEl from './lang/el.json';
import LangEs from './lang/es.json';
import LangFi from './lang/fi.json';
import LangFr from './lang/fr.json';
import LangHu from './lang/hu.json';
import LangIt from './lang/it.json';
import LangJa from './lang/ja.json';
import LangNl from './lang/nl.json';
import LangNo from './lang/no.json';
import LangPl from './lang/pl.json';
import LangPt from './lang/pt.json';
import LangSv from './lang/sv.json';
import LangTr from './lang/tr.json';
import LangTw from './lang/tw.json';

import ToastPlugin from './plugins/toast';

Vue.use(ToastPlugin, { position: 'center', });

Vue.config.productionTip = false;
Vue.use(VueI18n);

let lang = getQueryValue('lang') || 'en';

let identity_token_query = getQueryValue('identity_token');

router.beforeEach((to, from, next) => {
    let saveData = getNativeData();
    let { identity_token, api_token, } = saveData;

    if (identity_token && api_token) {
        // 已有登陆token，不需要登陆
        if (!identity_token_query) {
            if (to.name === 'PasswordLogin') {
                next({
                    path: '/account-menu',
                    query: { lang, },
                });
            } else {
                next();
            }
        } else {
            if (to.name === 'accountMenu') {
                next();
            } else {
                next({
                    path: '/account-menu',
                    query: { lang, },
                });
            }
        }
    } else {
        // 没有登陆信息，需要登陆
        if (identity_token_query) {
            store.dispatch('LoginByToken', {
                identity_token: identity_token_query.replace(/%2c/gi, ','),
                language: lang,
            })
                .then(() => {
                    next({
                        path: '/account-menu',
                        query: { lang, },
                    });
                })
                .catch(() => {
                    next({
                        path: '/login',
                        query: { lang, },
                    });
                });
        } else {
            if (to.name === 'PasswordLogin' || to.name === 'register' || to.name === 'passwordLessLogin' || to.name === 'findPassword') {
                next();
            } else {
                next({
                    path: '/login',
                });
            }
        }
    }
});
// android
const i18n = new VueI18n({
    locale: lang,
    messages: {
        'zh_rCN': LangZh,
        'en': LangEn,
        'cs_rCZ': LangCs,
        'da_rDK': LangDa,
        'de': LangDe,
        'el_rgr': LangEl,
        'es': LangEs,
        'fi_rFI': LangFi,
        'fr': LangFr,
        'hu': LangHu,
        'it': LangIt,
        'ja': LangJa,
        'nl': LangNl,
        'nb_rNO': LangNo,
        'pl': LangPl,
        'pt': LangPt,
        'sv_rSE': LangSv,
        'tr': LangTr,
        'zh_rTW': LangTw,
    },
});
// ios
// const i18n = new VueI18n({
//     locale: lang,
//     messages: {
//         'zh': LangZh,
//         'en': LangEn,
//         'cz': LangCs,
//         'dk': LangDa,
//         'de': LangDe,
//         'el': LangEl,
//         'es': LangEs,
//         'fi': LangFi,
//         'fr': LangFr,
//         'hu': LangHu,
//         'it': LangIt,
//         'jp': LangJa,
//         'nl': LangNl,
//         'no': LangNo,
//         'pl': LangPl,
//         'br': LangPt,
//         'se': LangSv,
//         'tr': LangTr,
//         'tw': LangTw,
//     },
// });
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App, },
    template: '<App/>',
});

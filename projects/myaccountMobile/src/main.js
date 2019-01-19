// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import { getQueryValue, } from '../../../lib/utils/index';
// import { isMicroMessenger, } from '../../../lib/utils/env';
import WEIXINCONFIG from '../../../lib/config/weixin';
import APCONFIG from '../../../lib/config/apowersoft';
import weixinApi from '../../../lib/utils/weixin';

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
let code = getQueryValue('code');
let state = getQueryValue('state');
let identity_token = getQueryValue('identity_token');
let isTest = getQueryValue('test');

async function getUserInfo(code) {
    alert('开始获取用户信息');
    let result = await weixinApi.getUserInfo(code);
    alert(`result:${JSON.stringify(result)}`);
}

//  微信浏览器内自动登陆
if (code && state) {
    alert(code);
    getUserInfo(code);
}

if (isTest) {
    if (!code || !state) {
        let weixinOauthLink = WEIXINCONFIG.getOauthLink(WEIXINCONFIG.appid, encodeURIComponent(APCONFIG.MYACCOUNTMOBILECNBASEURL), 'login');
        window.location = weixinOauthLink;
    }
}

router.beforeEach((to, from, next) => {
    if (Cookies.get('identity_token') && Cookies.get('api_token')) {
        if (!identity_token) {
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
        if (identity_token) {
            store.dispatch('LoginByToken', {
                identity_token: identity_token.replace(/%2c/gi, ','),
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

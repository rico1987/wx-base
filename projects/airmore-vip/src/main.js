// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import { getQueryValue, looseIndexOf, } from '../../../lib/utils/index';
import { getNativeData, saveNativeData, } from '../../../lib/utils/embedded';

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

Vue.config.productionTip = false;
Vue.use(VueI18n);

let lang = getQueryValue('lang') || 'zh';

let backobj = getQueryValue('backobj');

if (backobj) {
    try {
        backobj = JSON.parse(decodeURIComponent(backobj));
    } catch (error) {
        backobj = null;
    }
}

let saveData = getNativeData();

if (backobj) {
    saveData['backobj'] = backobj;
} else {
    delete saveData['backobj'];
}

saveNativeData(saveData);

// android
// let supportLangArr = ['cn', 'tw', 'en', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'nl', 'nb', 'pl', 'pt', 'sv', 'tr', ];
// if (startWith(lang, 'zh')) {
//     lang = lang.split('_')[1].toLowerCase();
// } else {
//     lang = lang.split('_')[0].toLowerCase();
// }

// ios
let supportLangArr = ['zh', 'en', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'nl', 'nb', 'pl', 'pt', 'sv', 'tr', ];

if (looseIndexOf(supportLangArr, lang) === -1) {
    lang = 'en';
}

// android
// const i18n = new VueI18n({
//     locale: lang,
//     messages: {
//         'cn': LangZh,
//         'tw': LangTw,
//         'en': LangEn,
//         'cs': LangCs,
//         'da': LangDa,
//         'de': LangDe,
//         'el': LangEl,
//         'es': LangEs,
//         'fi': LangFi,
//         'fr': LangFr,
//         'hu': LangHu,
//         'it': LangIt,
//         'ja': LangJa,
//         'nl': LangNl,
//         'nb': LangNo,
//         'pl': LangPl,
//         'pt': LangPt,
//         'sv': LangSv,
//         'tr': LangTr,
//     },
// });

// ios
const i18n = new VueI18n({
    locale: lang,
    messages: {
        'zh': LangZh,
        'en': LangEn,
        'cz': LangCs,
        'dk': LangDa,
        'de': LangDe,
        'el': LangEl,
        'es': LangEs,
        'fi': LangFi,
        'fr': LangFr,
        'hu': LangHu,
        'it': LangIt,
        'jp': LangJa,
        'nl': LangNl,
        'no': LangNo,
        'pl': LangPl,
        'br': LangPt,
        'se': LangSv,
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

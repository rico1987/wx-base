// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './styles/themes/default/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import { getQueryValue, looseIndexOf, startWith, } from '../../../lib/utils/index';
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

const PLATFORM = process.env.PLATFORM;

Vue.config.productionTip = false;
Vue.use(VueI18n);

let lang = getQueryValue('lang') || 'en';

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

let supportLangArr,
    i18n;

if (PLATFORM === 'android') {
    supportLangArr = ['cn', 'tw', 'en', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'nl', 'nb', 'pl', 'pt', 'sv', 'tr', ];
    if (startWith(lang, 'zh')) {
        lang = lang.split('_')[1].toLowerCase();
    } else {
        lang = lang.split('_')[0].toLowerCase();
    }
    i18n = new VueI18n({
        locale: lang,
        messages: {
            'cn': LangZh,
            'tw': LangTw,
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
            'nb': LangNo,
            'pl': LangPl,
            'pt': LangPt,
            'sv': LangSv,
            'tr': LangTr,
        },
    });
} else if (PLATFORM === 'ios') {
    supportLangArr = ['zh', 'en', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'nl', 'nb', 'pl', 'pt', 'sv', 'tr', ];
    if (looseIndexOf(supportLangArr, lang) === -1) {
        lang = 'en';
    }
    i18n = new VueI18n({
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
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App, },
    template: '<App/>',
});

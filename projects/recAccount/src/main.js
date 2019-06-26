// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import './styles/themes/default/index.scss';
import Layout from './views/layout/layout.vue';
import router from './router';
import store from './store';
import { getQueryValue, } from './utils/index';

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

router.beforeEach((to, from, next) => {
    const bodyWidth = to.meta.bodyWidth;
    const bodyHeight = to.meta.bodyHeight;
    if (bodyWidth && bodyHeight) {
        document.body.style.width = bodyWidth;
        document.body.style.height = bodyHeight;
    }
    next();
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
    components: { Layout, },
    template: '<Layout/>',
});

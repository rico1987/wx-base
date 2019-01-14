import Cookies from 'js-cookie';

export function getDomain(lang) {
    let langDomainMappings = {
        pt: '.com.br',
        en: '.com',
        zh: '.cn',
        tr: '-tr.com',
        no: '-no.com',
        cs: '.cz',
        da: '.dk',
        ja: '.jp',
        sv: '.se',
        el: '.gr',
    };

    let otherDomains = 'fr de it nl es fi pl tw hu'.split(' ');

    if (!langDomainMappings[lang] && !otherDomains.includes(lang)) {
        lang = 'en';
    }

    let dotcom = langDomainMappings[lang] || `.${lang}`;

    return `https://www.apowersoft${dotcom}`;
};

export function getQueryValue(key) {
    if (!location.search) {
        return null;
    }
    let queryString = location.search.substring(1);
    let find = queryString.split('&').find((ele) => {
        let queryKey = ele.split('=')[0];
        if (queryKey === key) {
            return true;
        } else {
            return false;
        }
    });
    if (find) {
        return find.split('=')[1];
    } else {
        return null;
    }
}

// 与ios和android原生交互函数

export function backToNative() {
    window.account && window.account.onBackToNative();
}

export function getNativeData() {
    if (window.account) {
        return JSON.parse(window.account.getData() || '{}');
    } else {
        return JSON.parse(Cookies.get('accountMobileSaveData') || '{}');
    }
}

export function saveNativeData(data) {
    if (data) {
        if (window.account) {
            window.account && window.account.onDataChanged(JSON.stringify(data));
        } else {
            Cookies.set('accountMobileSaveData', data);
        }
    } else {
        if (window.account) {
            window.account && window.account.onDataChanged('');
        } else {
            Cookies.set('accountMobileSaveData', '');
        }
    }
}

export function nativeLogin(data) {
    window.account && window.account.onLogin(JSON.stringify(data));
}

export function nativeLogout() {
    window.account && window.account.onLogout();
}

export function jump(from, to, route) {
    window.account && window.account.onWebJump(from, to, route);
}

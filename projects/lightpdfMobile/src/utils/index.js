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
    if (!location.search && !location.hash) {
        return null;
    }
    let queryString = location.search || location.hash;

    queryString = queryString.substring(queryString.lastIndexOf('?') + 1);
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
        let uinfo = '';
        if (window.uinfo) {
            uinfo = JSON.stringify(window.uinfo);
        }
        return JSON.parse(window.account.getData() || uinfo || '{}');
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
    if (data) {
        if (window.account) {
            window.account && window.account.onLogin(JSON.stringify(data));
        } else {
            Cookies.set('accountMobileSaveData', data);
        }
    }
}

export function nativeDownload(url, fileName) {
    console.log('nativeDownload', url, fileName);
    if (url && fileName && window.account) {
        window.account.onDownload(url, fileName);
    }
}

export function openUrl(url) {
    console.log('onOpenBrowser openUrl', url);
    if (url && window.account) {
        window.account.onOpenBrowser(url);
    }
}

export function nativeLogout() {
    window.account && window.account.onLogout();
}

export function jump(from, to, route, query) {
    let queryStr = '';
    if (query) {
        let keyvalueArr = Object.entries(query);
        queryStr = keyvalueArr.map(item => `${item[0]}=${item[1]}`).join('&');
    }
    console.log(from, to, route, queryStr);
    window.account && window.account.onWebJump(from, to, route, queryStr);
}

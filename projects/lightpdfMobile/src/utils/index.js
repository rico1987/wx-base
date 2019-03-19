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

/**
 * 返回到原生界面
 */
export function backToNative() {
    window.account && window.account.onBackToNative();
}

/**
 * 获取保存的数据，如果嵌入在原生系统，则从原生app获取，否则从cookie获取
 */
export function getNativeData() {
    if (window.account) {
        return JSON.parse(window.account.getData() || '{}');
    } else {
        return JSON.parse('{}');
    }
}

/**
 * 保存数据，如果嵌入在原生系统，则保存到原生系统，否则保存到cookie
 * @param {Object} data
 */
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

/**
 * 登陆后与原生同步登陆状态并保存数据
 */
export function nativeLogin(data) {
    if (data) {
        if (window.account) {
            window.account && window.account.onLogin(JSON.stringify(data));
        } else {
            Cookies.set('accountMobileSaveData', data);
        }
    }
}

/**
 * 原生下载文件
 * @param {String} url   地址
 * @param {String} fileName   重命名为新的文件名
 */
export function nativeDownload(url, fileName) {
    console.log('nativeDownload', url, fileName);
    if (url && fileName && window.account) {
        window.account.onDownload(url, fileName);
    }
}

/**
 * 浏览器打开 url
 * @param {String} url   地址
 */
export function openUrl(url) {
    console.log('onOpenBrowser openUrl', url);
    if (url && window.account) {
        window.account.onOpenBrowser(url);
    }
}

/**
 * 打开用户已经转换成功的文件列表
 */
export function openFolder() {
    console.log('onOpenFile');
    if (window.account) {
        window.account.onOpenFile();
    }
}

/**
 * 通知原生登出
 */
export function nativeLogout() {
    window.account && window.account.onLogout();
}

/**
 * 原生系统有可能嵌入多个webview，此函数提供从一个webview跳转到另一个webview的功能
 * @param {String} from 跳转起始项目
 * @param {String} to   跳转目标项目
 * @param {String} route    跳转目标项目的目标route
 * @param {Object} query    跳转目标项目带上的query
 */
export function jump(from, to, route, query) {
    let queryStr = '';
    if (query) {
        let keyvalueArr = Object.entries(query);
        queryStr = keyvalueArr.map(item => `${item[0]}=${item[1]}`).join('&');
    }
    console.log(from, to, route, queryStr);
    window.account && window.account.onWebJump(from, to, route, queryStr);
}
/**
 * 原生系统发送反馈
 * @param {String} mail 邮件地址
 * @param {String} content   反馈内容
 * @param {String} subject    反馈主题
 */
export function nativeFeedBack(mail, content, subject) {
    window.account && window.account.onFeedback(mail, subject, content);
}

/**
 * 判断网络是否已连接
 */
export function isNetConnect() {
    return window.account && window.account.isNetConnect();
}

/**
 * 判断wifi是否已连接
 */
export function isWifiConnect() {
    return window.account && window.account.isWifiConnect();
}

/**
 * 原生保存日志
 * @param {String} str 日志内容
 */
export function saveLog(str) {
    if (!str) {
        return;
    }
    return window.account && window.account.onSaveLog(str);
}

/**
 * 注册成功后通知原生回调供后台统计注册数据
 */
export function onRegister() {
    return window.account && window.account.onRegister();
}

/**
 * 返回到ios原生界面
 */
export function backToIosNative() {
    console.log('oioioio');
    window.account && window.account.onBackToPage();
}
/**
 * 获取app info 返回一个json；包含appName version
 */
export function getAppInfo() {
    console.log('getAppInfo');
    if (window.account && window.account.getAppInfo) {
        return JSON.parse(window.account.getAppInfo() || '{}');
    }
    return JSON.parse('{}');
}
/**
 * 调用app更新
 */
export function onCheckUpdate() {
    console.log('getAppInfo');
    window.account && window.account.onCheckUpdate();
}
/**
 * 调用ios购买
 */
export function isoPay(id) {
    console.log('onPayForProduct');
    window.account && window.account.onPayForProduct(id);
}
/**
 * 获取ios价格
 */
// export function getIosProductPrice(idArr) {
//     if (!idArr || idArr.length === 0) {
//         console.log('onPayForProduct no id');
//         return JSON.parse('{}');
//     }
//     console.log('onPayForProduct');
//     var idStr = JSON.stringify(idArr);
//     if (window.account && window.account.getProductInfos) {
//         return JSON.parse(window.account.getProductInfos(idStr) || '{}');
//     }
//     return JSON.parse('{}');
// }
export function getIosProductPrice(idArr) {
    if (!idArr || idArr.length === 0) {
        console.log('onPayForProduct no id');
        return;
    }
    console.log('onPayForProduct');
    var idStr = JSON.stringify(idArr);
    if (window.account && window.account.getProductInfos) {
        window.account.getProductInfos(idStr);
    }
}

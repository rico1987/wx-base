/**
 * 与ios和android原生交互函数
 * @author Rico <272355332@qq.com>
 */
import Cookies from 'js-cookie';

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
        return JSON.parse(Cookies.get('accountMobileSaveData') || '{}');
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
    window.account && window.account.onWebJump(from, to, route, queryStr);
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
 * 注册成功后通知原生回调供后台统计注册数据
 */
export function onRegister() {
    return window.account && window.account.onRegister();
}

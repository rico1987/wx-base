// registed_app 字段在 ios端应为 'iOS Airmore', android端应为 'Andorid Airmore', web端应为 'Web Airmore', pdf app应为 'Android PDF Converter'
import qs from 'qs';
import accountFetch from '../utils/accountFetch';
import cloudFetch from '../utils/cloudFetch';
import * as is from '../../../../lib/utils/is';
import { objToQuery, } from '../../../../lib/utils';

const REGISTERAPP = 'Andorid Lightmv';

export function login(account, password, language) {
    const data = {
        password,
        brand: 'Apowersoft',
        language,
    };
    if (is.isEmail(account)) {
        data.email = account;
    } else {
        data.telephone = account;
    }
    return accountFetch.post('/sessions', qs.stringify(data));
}

export function loginByToken(data) {
    const postData = {
        identity_token: data.identity_token,
        brand: 'Apowersoft',
        language: data.language,
    };
    return accountFetch.post('/sessions', qs.stringify(postData));
}

export function passwordLessLogin(data) {
    return accountFetch.post('/sessions', qs.stringify(Object.assign(data, {
        brand: 'Apowersoft',
        registed_app: REGISTERAPP,
    })));
}

export function registerByEmail(data) {
    return accountFetch.post('/users', qs.stringify({
        brand: 'Apowersoft',
        captcha: data.captcha,
        email: data.email,
        language: data.language,
        password: data.password,
        registed_app: REGISTERAPP,
    }));
}

export function registerByPhone(data) {
    return accountFetch.post('/users', qs.stringify({
        brand: 'Apowersoft',
        captcha: data.captcha,
        country_code: data.areaCode,
        language: data.language,
        password: data.password,
        telephone: data.phone,
        registed_app: REGISTERAPP,
    }));
}

export function changeAvatar() {

}

export function bindEmail(userId, email, vcode, language) {
    return accountFetch.put(`/users/${userId}/bindings/contactinfo`, qs.stringify({
        brand: 'Apowersoft',
        language,
        email,
        captcha: vcode,
    }));
}

export function bindPhone(userId, phone, vcode, areaCode, language) {
    return accountFetch.put(`/users/${userId}/bindings/contactinfo`, qs.stringify({
        brand: 'Apowersoft',
        language,
        telephone: phone,
        captcha: vcode,
        country_code: areaCode,
    }));
}

export function changePassword(data) {
    return accountFetch.put(`/users/${data.account}/passwords`, qs.stringify({
        brand: 'Apowersoft',
        password: data.password,
        password2: data.confirmPassword,
        language: data.language,
    }));
}

export function updateUserInfo() {

}

export function getAreaCodes(language) {
    return accountFetch.get(`countrycodes${objToQuery({
        brand: 'Apowersoft',
        language,
    })}`);
}

export function sendVcode(data) {
    return accountFetch.post('/captchas', qs.stringify(Object.assign(data, {
        brand: 'Apowersoft',
    })));
}

export function resetPassword(data) {
    return accountFetch.put('/passwords', qs.stringify(Object.assign(data, {
        brand: 'Apowersoft',
    })));
}

export function validateEmail(data) {
    return accountFetch.get(`validation${objToQuery({
        brand: 'Apowersoft',
        email: data.email,
        language: data.language,
    })}`);
}

// airmore cloud 分享邀请码相关

// 使用用户中心的identity_token换取cloud 的 api_token
export function loginAirmoreCloud(identity_token) {
    return cloudFetch.post('/sessions', qs.stringify({
        identity_token,
    }));
}

// 获取邀请码使用信息
export function getInvitationCodeInfo(cloud_api_token) {
    if (cloud_api_token) {
        cloudFetch.interceptors.request.use((config) => {
            config.headers.common.Authorization = `Bearer ${cloud_api_token}`;
            return config;
        }, error => Promise.reject(error));
    }
    return cloudFetch.get('/my/invitation/space');
}

// 判断是否已经使用了邀请码
export function checkHasUsedInvitationCode() {
    return cloudFetch.get('/my/invitation/code');
}

// 领取空间
export function getSpace(code) {
    return cloudFetch.post('/my/invitation/space', qs.stringify({
        code,
    }));
}

// 使用邀请码
export function useInvitationCode(code) {
    return cloudFetch.post('/my/invitation/code', qs.stringify({
        code,
    }));
}

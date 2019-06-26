import qs from 'qs';
import * as is from '@lib/utils/is';
import { objToQuery, } from '@lib/utils/index';
import accountFetch from '../utils/accountFetch';

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

export function loginByWeixinUniqueId(data) {
    const postData = {
        unique_id: data.unique_id,
        open_id: data.open_id,
        provider: 'weixin',
        brand: 'Apowersoft',
        registed_app: 'myaccountm.apowersoft.com',
        language: data.language,
    };
    return accountFetch.post('/sessions', qs.stringify(postData));
}

export function passwordLessLogin(data) {
    return accountFetch.post('/sessions', qs.stringify(Object.assign(data, {
        brand: 'Apowersoft',
        registed_app: 'myaccountm.apowersoft.com',
    })));
}

export function registerByEmail(data) {
    return accountFetch.post('/users', qs.stringify({
        brand: 'Apowersoft',
        captcha: data.captcha,
        email: data.email,
        language: data.language,
        password: data.password,
        registed_app: 'myaccountm.apowersoft.com',
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
        registed_app: 'myaccountm.apowersoft.com',
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

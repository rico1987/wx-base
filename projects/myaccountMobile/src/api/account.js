import qs from 'qs';
import accountFetch from '../utils/accountFetch';
import * as is from '../../../../lib/utils/is';
import { objToQuery, } from '../../../../lib/utils';

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

export function register() {

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

export function bindPhone(userId, phone, country_code, vcode ) {
    return accountFetch.put(`/users/${userId}/passwords`, qs.stringify({
    }));
}

export function changePassword(userId, password, repassword, language) {
    return accountFetch.put(`/users/${userId}/passwords`, qs.stringify({
        brand: 'Apowersoft',
        password,
        password2: repassword,
        language,
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

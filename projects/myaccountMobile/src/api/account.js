import qs from 'qs';
import accountFetch from '../utils/accountFetch';
import * as is from '../../../../lib/utils/is';
import { objToQuery, } from '../../../../lib/utils';

export function login(account, password) {
    const data = {
        password,
        brand: 'Apowersoft',
        language: 'en',
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

export function bindContact() {

}

export function changePassword() {

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

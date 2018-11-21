import accountFetch from '../utils/accountFetch';
import * as is from '../../../../lib/utils/index';

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
    return accountFetch.post('/sessions', data);
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

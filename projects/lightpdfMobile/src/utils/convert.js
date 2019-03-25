import ls from '../utils/littleStore';
import {getPdfSession, } from '../api/pdf';
import {getNativeData, saveNativeData, } from '../utils/index';

const convert = {
    state: {
        api_token: '',
        identity_token: '',
        userInfo: {},
        licenseInfo: {},
        fileItemList: [],
        index: 0,
    },
    isAccountLogin(token) {
        return token && !token.startsWith('-');
    },
    isLightPdfLogin(token) {
        return token && !token.startsWith('-');
    },
    getSession2: function() {
        getPdfSession().then((response) => {
            const data = response.data;
            let saveData = getNativeData();
            saveData['pdf_api_token'] = data.data.user.api_token;
            saveNativeData(saveData);
            ls.set('api_token', data.data.user.api_token);
        }).catch((error) => {
            console.log(error);
            if (error.error) {
                // error token失效
                // console.log('clear identity_token1');
                ls.set('identity_token', '');
                this.getSession();
                return;
            }
            let saveData = getNativeData();
            saveData['pdf_api_token'] = '';
            saveNativeData(saveData);
            ls.set('api_token', '');
            ls.set('client-vip', 0);
        });
    },
    getSession: function() {
        return new Promise((resolve, reject) => {
            getPdfSession().then((response) => {
                const data = response.data;
                let saveData = getNativeData();
                saveData['pdf_api_token'] = data.data.user.api_token;
                saveNativeData(saveData);
                ls.set('api_token', data.data.user.api_token);
                resolve();
            }).catch((error) => {
                console.log(error);
                let saveData = getNativeData();
                saveData['pdf_api_token'] = '';
                saveData['client-vip'] = '0';
                saveNativeData(saveData);
                ls.set('api_token', '');
                ls.set('client-vip', 0);
                reject();
            });
        });
    },
};

export default convert;

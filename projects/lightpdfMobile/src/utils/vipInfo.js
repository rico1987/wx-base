import {getPdfConverterVipInfo, } from '../api/support';
import ls from '../utils/littleStore';
import stProxy from '../utils/storeProxy';
import {getNativeData, saveNativeData, } from '../utils/index';

const vip = {
    freshIdentityToken() {
        console.log('freshIdentityToken333');
        let saveData = getNativeData();
        let token = saveData['identity_token'] || ls.get('identity_token') || '';
        if (token) {
            ls.set('identity_token', token);
        } else {
            ls.set('identity_token', '');
            console.log('clear identity_token3');
            vip.licenseInfo = null;
        }
        console.log('identity_token', ls.get('identity_token'));
    },
    shortTime(time) {
        if (!time) {
            return '';
        }
        let machArr = time.match(/\d{4}-\d{2}-\d{2}/);
        if (machArr) {
            return machArr[0];
        }
        return time;
    },
    getVip(callback) {
        console.log('iiiii-2222---vip--infooooo');
        getPdfConverterVipInfo().then((response) => {
            const data = response.data;
            // let saveData = getNativeData();
            console.log(data);
            if (data.data.license_info && data.data.user_info && data.data.license_info.is_activated === '1') {
                stProxy.set('client-vip', '1');
                // ls.set('client-vip', '1');
                // saveData['client-vip'] = '1';
                // saveNativeData(saveData);
                // ls.set('client-vip-express-day', data.data.license_info.expire_date);
                data.data.license_info.expire_date = this.shortTime(data.data.license_info.expire_date);
                stProxy.set('client-vip-express-day', data.data.license_info.expire_date);
                data.data.license_info.isVip = 1;
                vip.licenseInfo = data.data.license_info;
                // saveData = getNativeData();
                // saveData['licenseInfo'] = vip.licenseInfo;
                stProxy.setDataByKey('licenseInfo', vip.licenseInfo);
            } else {
                // ls.set('client-vip', 0);
                // saveData['licenseInfo'] = null;
                // saveData['client-vip'] = '0';
                // saveNativeData(saveData);
                stProxy.set('client-vip', 0);
                stProxy.set('client-vip-express-day', '');
                stProxy.setDataByKey('licenseInfo', null);
                vip.licenseInfo = null;
            }
            if (callback) {
                console.log('vip-call back');
                callback(vip.licenseInfo);
            }
        }).catch((error) => {
            error;
            ls.set('client-vip', 0);
            let saveData = getNativeData();
            vip.licenseInfo = null;
            saveData['licenseInfo'] = null;
            saveData['client-vip'] = '0';
            saveNativeData(saveData);
            if (callback) {
                console.log('vip-call err back');
                callback(vip.licenseInfo);
            }
        });
    },
    init() {
        window.freshVip = this.getVip;
    },
    licenseInfo: null,
};

export default vip;

import {getPdfConverterVipInfo, } from '../api/support';
import ls from '../utils/littleStore';
import {getNativeData, } from '../utils/index';

const vip = {
    freshIdentityToken() {
        console.log('freshIdentityToken');
        let data = getNativeData();
        if (data && data.identity_token) {
            ls.set('identity_token', data.identity_token);
        } else {
            ls.set('identity_token', '');
            console.log('clear identity_token3');
            vip.licenseInfo = null;
        }
        console.log('identity_token', ls.get('identity_token'));
    },
    getVip(callback) {
        console.log('iiiii----vip--infooooo');
        getPdfConverterVipInfo().then((response) => {
            const data = response.data;
            console.log(data);
            if (data.data.license_info && data.data.user_info && data.data.license_info.is_activated === '1') {
                ls.set('client-vip', 1);
                ls.set('client-vip-express-day', data.data.license_info.expire_date);
                data.data.license_info.isVip = 1;
                vip.licenseInfo = data.data.license_info;
            } else {
                ls.set('client-vip', 0);
                vip.licenseInfo = null;
            }
            if (callback) {
                console.log('vip-call back');
                callback(vip.licenseInfo);
            }
        }).catch((error) => {
            error;
            ls.set('client-vip', 0);
            vip.licenseInfo = null;
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

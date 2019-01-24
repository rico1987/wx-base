import {getPdfConverterVipInfo, } from '../api/support';
import ls from '../utils/littleStore';

const vip = {
    getVip() {
        console.log('iiiii----vip--infooooo');
        getPdfConverterVipInfo().then((response) => {
            const data = response.data;
            if (data.data.license_info && data.data.user_info && data.data.license_info.is_activated === 1) {
                ls.set('client-vip', 1);
            } else {
                ls.set('client-vip', 0);
            }
        }).catch((error) => {
            error;
            ls.set('client-vip', 0);
        });
    },
    init() {
        window.freshVip = this.getVip;
    },
};

export default vip;

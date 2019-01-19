import axios from 'axios';
import WEIXINCONFIG from '../config/weixin';

const weixinApi = {
    onBridgeReady: function(pay_info) {
        let WeixinJSBridge = window.WeixinJSBridge;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': WEIXINCONFIG.appid,
                'timeStamp': pay_info.timeStamp,
                'nonceStr': pay_info.nonceStr,
                'package': pay_info.package,
                'signType': pay_info.signType,
                'paySign': pay_info.paySign,
            },
            (res) => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    // 支付成功后关闭微信页面窗口
                    WeixinJSBridge.call('closeWindow');
                }
            });
    },

    // 微信公众平台code换取userInfo
    getUserInfo: async function(code) {
        let tokenRes = await axios.get(WEIXINCONFIG.getAccessTokenLink(WEIXINCONFIG.appid, WEIXINCONFIG.appsecret, code));
        if (!tokenRes.errcode) {
            let infoRes = await axios.get(WEIXINCONFIG.getUserInfoLink(tokenRes.access_token, tokenRes.openid));
            if (!infoRes.errcode) {
                return infoRes;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
};

export default weixinApi;

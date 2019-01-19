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
    getUserInfo: function(code) {
        return new Promise((resolve, reject) => {
            const service = axios.create({
                baseURL: WEIXINCONFIG.baseApiUrl,
                timeout: 5000,
            });
            alert('开始发送请求');
            service.get(WEIXINCONFIG.getAccessTokenLink(WEIXINCONFIG.appid, WEIXINCONFIG.appsecret, code))
                .then((tokenRes) => {
                    alert(`tokenRes:${JSON.stringify(tokenRes)}`);
                    if (!tokenRes.errcode) {
                        service.get(WEIXINCONFIG.getUserInfoLink(tokenRes.access_token, tokenRes.openid))
                            .then((infoRes) => {
                                alert(JSON.stringify(infoRes));
                                if (!infoRes.errcode) {
                                    resolve(infoRes);
                                } else {
                                    reject();
                                }
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    } else {
                        reject();
                    }
                })
                .catch((err) => {
                    alert(`err:${JSON.stringify(err.data)}`);
                    reject(err);
                });
        });
    },
};

export default weixinApi;

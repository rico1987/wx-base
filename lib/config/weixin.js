const WEIXINCONFIG = {
    appid: 'wx1d396e446d0ecf21',
    appsecret: 'a88ce9d5fd96f8b46e2dad219fd05292',
    getOauthLink: function(appid, redirect_uri, state) {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
    },
    getAccessTokenLink: function(appid, appsecret, code) {
        return `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
    },
    getUserInfoLink: function(access_token, openid) {
        return `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    },
    getRefreshTokenLink: function(appid, refresh_token) {
        return `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;
    },
};

export default WEIXINCONFIG;

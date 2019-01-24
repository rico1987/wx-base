const WEIXINCONFIG = {
    appid: 'wx1d396e446d0ecf21',
    baseApiUrl: 'https://api.weixin.qq.com',

    getOauthLink: function(appid, redirect_uri, state) {
        // eslint-disable-next-line
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
    },
    getAccessTokenLink: function(appid, appsecret, code) {
        return `/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`;
    },
};

export default WEIXINCONFIG;

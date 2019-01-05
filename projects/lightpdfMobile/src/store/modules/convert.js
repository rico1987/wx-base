const convert = {
    state: {
        api_token: '',
        identity_token: '',
        userInfo: {},
        licenseInfo: {},
        fileItemList: [],
        index: 0,
    },

    mutations: {
        SET_API_TOKEN: (state, api_token) => {
            state.api_token = api_token;
        },
        SET_IDENTITY_TOKEN: (state, identity_token) => {
            state.identity_token = identity_token;
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_LICENSE_INFO: (state, licenseInfo) => {
            state.licenseInfo = licenseInfo;
        },
        ADD_FILE_ITEM: (state, item) => {
            state.fileItemList.push(item);
        },
        DEL_ALL_FILE: (state) => {
            state.fileItemList.length = 0;
        },
    },

    actions: {
        UpdateUserInfo({ commit, }, userInfo) {
            return new Promise((resolve) => {
                commit('SET_USER_INFO', userInfo);
                // Cookies.set('userInfo', JSON.stringify(userInfo));
                resolve();
            });
        },
        // 账号密码登陆
        // LoginByUsername({ commit, }, loginInfo) {
        //     const account = loginInfo.account.trim();
        //     return new Promise((resolve, reject) => {
        //         login(account, loginInfo.password, loginInfo.language).then((response) => {
        //             const data = response.data;
        //             if (data && data.status === '1') {
        //                 commit('SET_API_TOKEN', data.data.api_token);
        //                 commit('SET_IDENTITY_TOKEN', data.data.identity_token);
        //                 commit('SET_USER_INFO', data.data.user);
        //                 Cookies.set('api_token', data.data.api_token);
        //                 Cookies.set('identity_token', data.data.identity_token);
        //                 Cookies.set('userInfo', JSON.stringify(data.data.user));
        //                 // 与android登陆的交互
        //                 window.account && window.account.onLogin(document.cookie);
        //                 resolve();
        //             } else {
        //                 reject(data.status);
        //             }
        //         }).catch((error) => {
        //             reject(error);
        //         });
        //     });
        // },
    },
};

export default convert;

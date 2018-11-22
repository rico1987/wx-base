import { login, changeAvatar, updateUserInfo, } from '@/api/account';

const user = {
    state: {
        api_token: '',
        identity_token: '',
        userInfo: {},
    },

    mutations: {
        SET_API_TOKEN: (state, api_token) => {
            state.api_token = api_token;
        },
        SET_IDENTITY_TOKEN: (state, identity_token) => {
            state.identity_token = identity_token;
        },

    },
};

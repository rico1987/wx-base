import Cookies from 'js-cookie';
import { login, registerByEmail, registerByPhone, changePassword, passwordLessLogin, loginByToken, } from '@/api/account';

const user = {
    state: {
        api_token: '',
        identity_token: '',
        userInfo: {},
        licenseInfo: {},
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
    },

    actions: {
        UpdateUserInfo({ commit, }, userInfo) {
            return new Promise((resolve) => {
                commit('SET_USER_INFO', userInfo);
                Cookies.set('userInfo', JSON.stringify(userInfo));
                resolve();
            });
        },
        // 账号密码登陆
        LoginByUsername({ commit, }, loginInfo) {
            const account = loginInfo.account.trim();
            return new Promise((resolve, reject) => {
                login(account, loginInfo.password, loginInfo.language).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        commit('SET_USER_INFO', data.data.user);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        Cookies.set('userInfo', JSON.stringify(data.data.user));
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        // 免密登陆
        PasswordLessLogin({ commit, }, loginInfo) {
            return new Promise((resolve, reject) => {
                passwordLessLogin(loginInfo).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        commit('SET_USER_INFO', data.data.user);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        Cookies.set('userInfo', JSON.stringify(data.data.user));
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        // 邮箱注册
        EmailRegister({ commit, }, registerInfo) {
            return new Promise((resolve, reject) => {
                registerByEmail(registerInfo).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        commit('SET_USER_INFO', data.data.user);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        Cookies.set('userInfo', JSON.stringify(data.data.user));
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        // 手机注册
        PhoneRegister({ commit, }, registerInfo) {
            return new Promise((resolve, reject) => {
                registerByPhone(registerInfo).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        commit('SET_USER_INFO', data.data.user);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        Cookies.set('userInfo', JSON.stringify(data.data.user));
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        // 修改密码
        ResetPassword({ commit, }, postData) {
            return new Promise((resolve, reject) => {
                changePassword(postData).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        // 登出
        Logout({ commit, }) {
            return new Promise((resolve) => {
                commit('SET_API_TOKEN', '');
                commit('SET_IDENTITY_TOKEN', '');
                commit('SET_USER_INFO', {});
                commit('SET_LICENSE_INFO', {});
                Cookies.remove('api_token');
                Cookies.remove('identity_token');
                Cookies.remove('userInfo');
                Cookies.remove('license_info');
                // 与android登陆的交互
                window.account && window.account.onLogout();
                resolve();
            });
        },

        // token登陆
        LoginByToken({ commit, }, loginInfo) {
            return new Promise((resolve, reject) => {
                loginByToken(loginInfo).then((response) => {
                    const data = response.data;
                    if (data && data.status === '1') {
                        commit('SET_API_TOKEN', data.data.api_token);
                        commit('SET_IDENTITY_TOKEN', data.data.identity_token);
                        commit('SET_USER_INFO', data.data.user);
                        Cookies.set('api_token', data.data.api_token);
                        Cookies.set('identity_token', data.data.identity_token);
                        Cookies.set('userInfo', JSON.stringify(data.data.user));
                        // 与android登陆的交互
                        window.account && window.account.onLogin(document.cookie);
                        resolve();
                    } else {
                        reject(data.status);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        },
    },
};

export default user;

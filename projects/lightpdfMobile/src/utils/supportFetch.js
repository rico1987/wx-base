import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';
import ls from '../utils/littleStore';
import {getNativeData, } from '../utils/index';

const service = axios.create({
    baseURL: config.supportApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let saveData = getNativeData();
    console.log('supportfetch - identity', saveData['identity_token'], ls.get('identity_token'));
    let identity_token = saveData['identity_token'] || ls.get('identity_token') || Cookies.get('identity_token');
    if (identity_token) {
        if (config.data) {
            if (config.data && config.data.length > 0) {
                config.data += `&identity_token=${identity_token}`;
            } else {
                config.data += `identity_token=${identity_token}`;
            }
        } else {
            config.data = `identity_token=${identity_token}`;
        }
    }
    return config;
}, error => Promise.reject(error));

// 添加响应拦截器
service.interceptors.response.use(response => response, (error) => {
    Promise.reject(error.message);
});

export default service;

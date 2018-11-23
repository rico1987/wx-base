import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const service = axios.create({
    baseURL: config.supportApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let identity_token = Cookies.get('identity_token');
    if (identity_token) {
        config.headers['identity_token'] = identity_token;
    }
    return config;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
    console.log(response);
    return response;
}, (error) => {
    console.log(error);
    return Promise.reject(error.response && error.response.data);
});

export default service;

import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const service = axios.create({
    baseURL: config.accountApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let api_token = Cookies.get('api_token');
    if (api_token) {
        config.headers['Authorization'] = `Bearer ${api_token}`;
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
    return Promise.reject(error.response.data);
});

export default service;

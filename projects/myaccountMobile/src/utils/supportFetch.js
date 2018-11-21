import axios from 'axios';

import config from '../config';

const service = axios.create({
    baseURL: config.supportApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    console.log(config);
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
    return Promise.reject(error);
});

export default service;

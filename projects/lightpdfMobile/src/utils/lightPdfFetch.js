import axios from 'axios';
import config from '../config';
import ls from '../utils/littleStore';

const service = axios.create({
    baseURL: config.lightPdfApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let api_token = ls.get('api_token');
    if (api_token) {
        config.headers['Authorization'] = `Bearer ${api_token}`;
    }
    return config;
}, error => Promise.reject(error));

// 添加响应拦截器
service.interceptors.response.use(response => response, error => Promise.reject(error.response.data));

export default service;

import axios from 'axios';
import { getNativeData, } from '@lib/utils/embedded';
import config from '../config';

const service = axios.create({
    baseURL: config.accountApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let saveData = getNativeData();
    let api_token = saveData['api_token'];
    if (api_token) {
        config.headers['Authorization'] = `Bearer ${api_token}`;
    }
    return config;
}, error => Promise.reject(error));

// 添加响应拦截器
service.interceptors.response.use(response => response, error => Promise.reject(error.response.data));

export default service;

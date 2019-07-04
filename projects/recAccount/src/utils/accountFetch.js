import axios from 'axios';
import Cookies from 'js-cookie';
import { generateRandomString, } from '@lib/utils/index';
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
    if (config.url.indexOf('?') > -1) {
        config.url += `request_sequence=${generateRandomString(10)}`;
    } else {
        config.url += `?request_sequence=${generateRandomString(10)}`;
    }
    return config;
}, error => Promise.reject(error));

// 添加响应拦截器
service.interceptors.response.use(response => response, error => Promise.reject(error.response.data));

export default service;

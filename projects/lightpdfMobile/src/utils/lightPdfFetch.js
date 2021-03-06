import axios from 'axios';
import config from '../config';
import ls from '../utils/littleStore';
import {saveLog, getNativeData, } from '../utils/index';

const service = axios.create({
    baseURL: config.lightPdfApiBaseUrl,
    timeout: config.timeout,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
    let saveData = getNativeData();
    let api_token = saveData['pdf_api_token'] || ls.get('pdf_api_token') || '';
    if (api_token) {
        config.headers['Authorization'] = `Bearer ${api_token}`;
        config.headers['IsClientVip'] = 1;

    }
    console.log('lightPdfFetch', process.isIos);
    console.log(process.isIos);
    let clios = 'Android';
    if (process.isIos === '1') {
        clios = 'IOS';
    }
    config.headers['Cli-OS'] = clios;
    config.headers['APP'] = 'ApowerPDF';
    config.headers['Brand'] = 'Apowersoft';
    return config;
}, error => Promise.reject(error));

// 添加响应拦截器
service.interceptors.response.use(response => response, (error) => {
    let str = JSON.stringify(error);
    saveLog(str);
    Promise.reject(error.response.data);
});

export default service;

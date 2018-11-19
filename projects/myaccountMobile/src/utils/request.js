import axios from 'axios';
import CONFIG from '../config/index';

export const passportService = axios.create({
    baseURL: CONFIG.PASSPORT_BASE_API,
    timeout: 5000, // request timeout
});

export const supportService = axios.create({
    baseURL: CONFIG.SUPPORT_BASE_API,
    timeout: 5000, // request timeout
});

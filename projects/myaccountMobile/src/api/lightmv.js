import qs from 'qs';
import Cookies from 'js-cookie';
import lightmvFetch from '../utils/lightmvFetch';
import { objToQuery, } from '../../../../lib/utils';

export function login(identity_token) {
    return lightmvFetch.post('/sessions', qs.stringify({
        identity_token,
    }));
}

export function getConsumptionList(page, per_page, language) {
    const lightmvApiToken = Cookies.get('lightmv_api_token');
    return lightmvFetch.get(`/my/coin-consumes${objToQuery({
        page,
        per_page,
        language,
        api_token: lightmvApiToken,
    })}`);
}

export function getLightmvVipInfo() {
    const lightmvApiToken = Cookies.get('lightmv_api_token');
    return lightmvFetch.get(`/my/vip${objToQuery({
        api_token: lightmvApiToken,
    })}`);
}

export function getOrderList(page, per_page, language) {
    const lightmvApiToken = Cookies.get('lightmv_api_token');
    return lightmvFetch.get(`/my/orders${objToQuery({
        page,
        per_page,
        language,
        api_token: lightmvApiToken,
    })}`);
}

export function getLightmvProducts(language) {
    const lightmvApiToken = Cookies.get('lightmv_api_token');
    const platform = language === 'zh' ? 'Apowersoft-CN' : 'Avangate';
    return lightmvFetch.get(`/coins/products${objToQuery({
        platform,
        language,
        api_token: lightmvApiToken,
    })}`);
}


import qs from 'qs';
import { getNativeData, } from '@lib/utils/embedded';
import lightmvFetch from '../utils/lightmvFetch';
import { objToQuery, } from '../../../../lib/utils';

export function login(identity_token) {
    return lightmvFetch.post('/sessions', qs.stringify({
        identity_token,
    }));
}

export function getConsumptionList(page, per_page, language) {
    const saveData = getNativeData();
    const lightmvApiToken = saveData['lightmv_api_token'];
    return lightmvFetch.get(`/my/coin-consumes${objToQuery({
        page,
        per_page,
        language,
        api_token: lightmvApiToken,
    })}`);
}

export function getOrderList(page, per_page, language) {
    const saveData = getNativeData();
    const lightmvApiToken = saveData['lightmv_api_token'];
    return lightmvFetch.get(`/my/orders${objToQuery({
        page,
        per_page,
        language,
        api_token: lightmvApiToken,
    })}`);
}

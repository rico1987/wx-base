// import qs from 'qs';
import lightPdfFetch from '../utils/lightPdfFetch';
import ls from '../utils/littleStore';
// import * as is from '../../../../lib/utils/is';
// import { objToQuery, } from '../../../../lib/utils';

export function getPdfSesstion() {
    let data = {
        identity_token: ls.get('account_id_token') || '',
    };
    return lightPdfFetch.post('/sessions', data);
}

export function getPdfSesstion2() {
    return lightPdfFetch.post('/sessions');
}

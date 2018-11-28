import qs from 'qs';
import supportFetch from '../utils/supportFetch';
import * as is from '../../../../lib/utils/is';
import { objToQuery, } from '../../../../lib/utils';

export function getOrders(page = 1, size = 10) {
    return supportFetch.post('/account', qs.stringify({
        action: 'get-orders',
        language: 'en',
        page: page,
        per_page: size,
    }));
}

export function getTickets(page = 1, size = 10) {
    return supportFetch.post('/account', qs.stringify({
        action: 'get-tickets',
        language: 'en',
        page: page,
        per_page: size,
    }));
}

import qs from 'qs';
import supportFetch from '../utils/supportFetch';
import * as is from '../../../../lib/utils/is';
import { objToQuery, } from '../../../../lib/utils';

export function getOrders(page = 1, size = 10) {
    debugger;
    // return supportFetch.get(`/accountqs.stringify({
    //     action: 'get-tickets',
    //     language: 'en',
    //     page: page,
    //     per_page: size,
    // }));
    return supportFetch.post('/account', {
        action: 'get-tickets',
        language: 'en',
        page: page,
        per_page: size,
    });
}

export function getTickets() {

}

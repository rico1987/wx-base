// import qs from 'qs';
import lightPdfFetch from '../utils/lightPdfFetch';
import ls from '../utils/littleStore';
// import * as is from '../../../../lib/utils/is';
// import { objToQuery, } from '../../../../lib/utils';

export function getPdfSession() {
    let data = {
        identity_token: ls.get('identity_token') || '',
    };
    return lightPdfFetch.post('/sessions', data);
}

export function getPdfSession2() {
    return lightPdfFetch.post('/sessions');
}

export function getFileAuthorization(files) {
    let filesNameArr = files.map(fileItem => fileItem.name);
    filesNameArr;
    let data = {
        files: filesNameArr,
    };
    return lightPdfFetch.post('/authentications', data);
}

export function createTask(data) {
    return lightPdfFetch.post('/tasks', data);
}

export function getTaskInfo(taskid) {
    var str = `?_t=${Date.now()}`;
    return lightPdfFetch.get(`/tasks/${taskid}${str}`);
}

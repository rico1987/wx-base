import airmoreCloudFetch from '../utils/airmoreCloudFetch';

export default function getVipInfo() {
    return airmoreCloudFetch.get('/my/info');
}

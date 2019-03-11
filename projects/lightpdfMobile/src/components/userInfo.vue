<template>
    <div class="user-info">
        <div class="avatar">
            <img v-show="userInfo && userInfo.avatar" :src="userInfo.avatar">
        </div>
        <div class="user-name">{{userInfo.nickname}}</div>
        <div class="expire-day"
        v-show="licenseInfo.isVip"
        >
            {{$tr('001685',licenseInfo.expire_date)}}
        </div>
    </div>
</template>

<script>
// import ls from '../utils/littleStore';
import vip from '../utils/vipInfo';

export default {
    name: 'UserInfo',

    componentName: 'UserInfo',

    props: [
        'info',
    ],
    data() {
        return {
            userInfo: this.info,
            licenseInfo: {
                expire_date: '',
                isVip: 0,
            },
        };
    },
    created() {
        if (vip.licenseInfo) {
            this.licenseInfo['expire_date'] = vip.licenseInfo['expire_date'];
            this.licenseInfo['isVip'] = vip.licenseInfo['isVip'];
        }
    },

    computed: {
    },
};
</script>
<style lang="scss">
</style>

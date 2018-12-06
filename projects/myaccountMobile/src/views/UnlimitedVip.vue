<template>
    <div class="myaccount-unlimited-vip has-header">
        <MobileHeader
            defaultLeft
            title="Unlimited Vip"
        >
        </MobileHeader>
        <div class="myaccount-unlimited-vip__vip-header" v-if="isVip">
            <p class="title">Unlimited VIP</p>
            <div class="avatar">
                <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                <span></span>
            </div>
            <p class="validity">{{ getLicenseType() }}</p>
        </div>
        <div class="myaccount-unlimited-vip__no-vip-header" v-if="!isVip">
            <p>{{ $t('001800') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__privilege">
            <h2>{{ $t('001801') }}</h2>
            <p>{{ $t('001802') }}</p>
            <p>{{ $t('001803') }}<a :href="unlimitedLink" target="_blank">Check>></a></p>
            <p>{{ $t('001804') }}</p>
            <p>{{ $t('001805') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__rights">
            <h2>{{ $t('001806') }}</h2>
            <p>{{ $t('001807') }}</p>
            <p>{{ $t('001808') }}</p>
            <p>{{ $t('001809') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__buy-link" v-if="!isVip">
            <div class="left">
                <p>开通$9.9/月</p>
            </div>
            <div class="right">
                <p>开通$99/年</p>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'unlimitedVip',
    components: {
        MobileHeader,
    },
    data() {
        return {
            isVip: false,
            userInfo: null,
            licenseInfo: null,
            unlimitedLinkL: null,
        };
    },

    created: function() {
        this.getAvatarUrl();
        this.getLincenseInfo();
        if (this.$i18n.locale === 'zh') {
            this.unlimitedLink = 'https://www.apowersoft.cn/all-apowersoft';
        } else {
            this.unlimitedLink = 'https://www.apowersoft.com/all-apowersoft';
        }
    },

    methods: {
        getAvatarUrl() {
            let saveData = Cookies.get('userInfo');
            try {
                this.userInfo = JSON.parse(saveData);
            } catch (error) {
            }
        },
        getLincenseInfo() {
            let licenseInfo = Cookies.get('license_info');
            try {
                this.licenseInfo = JSON.parse(licenseInfo);
                this.isVip = this.licenseInfo.is_activated === '1';
            } catch (error) {
            }
        },
        getLicenseType() {
            if (this.licenseInfo.passport_license_type === 'lifetime') {
                return this.$t('001247');
            } else if (this.licenseInfo.is_activated === '1') {
                let remainDays = parseInt(this.licenseInfo.remain_days, 10);
                let deadline = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * remainDays));
                return `${this.$t('001210')}: ${deadline.toLocaleDateString}`;
            }
        },
    },
};
</script>

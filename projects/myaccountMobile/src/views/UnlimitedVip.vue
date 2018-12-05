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
            <p>Open the exclusive privilege of Unlimited VIP</p>
        </div>
        <div class="myaccount-unlimited-vip__privilege">
            <h2>VIP privilege</h2>
            <p>享所有Apowersoft在线产品免费使用权</p>
            <p>享Unlimited桌面产品免费使用所有产品权<a :href="unlimitedLink" target="_blank">查看>></a></p>
            <p>享云端5G存储空间，助您轻松存储分享</p>
            <p>享所有增值服务5折购买权益</p>
        </div>
        <div class="myaccount-unlimited-vip__rights">
            <h2>Rights and interests</h2>
            <p>开通Unlimited VIP 尊享OCR8折优惠</p>
            <p>开通Unlimited VIP 尊享LightMV8折优惠</p>
            <p>开通Unlimited VIP 尊享LightPDF8折优惠</p>
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

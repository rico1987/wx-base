<template>
    <div class="myaccount-account-menu">
        <div class="header">
            <div class="avatar-container">
                <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                <div class="crown" v-if="isVip"></div>
            </div>
            <p class="nickname">{{userInfo && userInfo.nickname}}</p>
            <p class="privileges" @click="goto('unlimited-vip')">
                {{ $t('001781') }}
            </p>
        </div>
        <div class="container">
            <ul class="mobile-list-items">
                <li class="mobile-list-items__item item-1" @click="goto('info')">{{ $t("001263") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-2" @click="goto('orders')">{{ $t("001264") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-3" @click="goto('invoice')" v-if="lang === 'zh'">我的发票
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-3" @click="goto('work-list')">{{ $t("001265") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-4" @click="goto('reset-password')">{{ $t("001266") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-5" @click="goto('setting')">{{ $t("001401") }}
                    <span></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'accountMenu',
    components: {
    },
    data() {
        return {
            userInfo: null,
            licenseInfo: null,
            isVip: false,
            lang: null,
        };
    },

    created: function() {
        this.getUserInfo();
        this.getLincenseInfo();
        this.lang = this.$i18n.locale;
        console.log(this.lang);
    },
    methods: {
        getUserInfo() {
            let saveData = Cookies.get('userInfo');
            try {
                this.userInfo = JSON.parse(saveData);
            } catch (error) {
            }
        },
        goto(path) {
            this.$router.push({ path, });
        },
        getLincenseInfo() {
            this.$store.dispatch('GetLicenseInfo');
            let licenseInfo = Cookies.get('license_info');
            try {
                this.licenseInfo = JSON.parse(licenseInfo);
                this.isVip = this.licenseInfo.is_activated === '1';
            } catch (error) {
            }
        },
    },
};
</script>

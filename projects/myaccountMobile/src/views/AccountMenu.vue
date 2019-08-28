<template>
    <div class="myaccount-account-menu">
        <div class="header">
            <div class="avatar-container">
                <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
            </div>
            <p class="nickname">
                {{userInfo && userInfo.nickname}}
            </p>
            <p v-if="isVip && isLightmv" class="vip"><span>{{ $t("001861") }}</span></p>
            <p class="privileges" v-if="!isLightmv" @click="goto('unlimited-vip')">
                {{ $t('001781') }}
            </p>
        </div>
        <div class="container">
            <ul class="mobile-list-items">
                <li class="mobile-list-items__item account" @click="goto('info')">{{ $t("001263") }}
                    <span></span>
                </li>
                <li v-if="isLightmv" class="mobile-list-items__item token" @click="goto('buy-token')">{{ $t("001872") }}
                    <span></span>
                </li>
                <li v-if="!isLightmv" class="mobile-list-items__item info" @click="goto('orders')">{{ $t("001264") }}
                    <span></span>
                </li>
                <li v-if="isLightmv" class="mobile-list-items__item info" @click="goto('consumption-list')">{{ $t("001854") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item invoice" @click="goto('invoice')" v-if="lang === 'zh'">我的发票
                    <span></span>
                </li>
                <li class="mobile-list-items__item ticket" @click="goto('work-list')">{{ $t("001265") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item password" @click="goto('reset-password')">{{ $t("001266") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item setting" @click="goto('setting')">{{ $t("001401") }}
                    <span></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { login, getLightmvVipInfo, } from '@/api/lightmv';

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
        if (this.isLightmv) {
            this.lightmvAutoLogin();
        }
        this.lang = this.$i18n.locale;
    },
    methods: {

        lightmvAutoLogin() {
            const saveData = Cookies.get('lightmvUserInfo');
            let lightmvApiToken;
            if (saveData) {
                lightmvApiToken = saveData['lightmv_api_token'];
            }
            if (!lightmvApiToken) {
                const identity_token = Cookies.get('identity_token');
                login(identity_token)
                    .then((res) => {
                        if (res.data.status === '1') {
                            const lightmvUserInfo = res.data.data.user;
                            Cookies.set('lightmvUserInfo', lightmvUserInfo);
                            Cookies.set('lightmv_api_token', lightmvUserInfo['api_token']);
                            this.isVip = lightmvUserInfo['is_vip'];

                            getLightmvVipInfo()
                                .then((res) => {
                                    if (res.data.status === '1') {
                                        const lightmvVipInfo = res.data.data && res.data.data.vip;
                                        Cookies.set('lightmvVipInfo', lightmvVipInfo);
                                    }
                                });
                        }
                    });
            }
        },

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

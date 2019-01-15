<template>
    <div class="myaccount-account-menu has-header">
        <MobileHeader
            defaultLeft
            isReturnToNative
        >
        </MobileHeader>
        <div class="header">
            <div class="avatar-container">
                <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                <div class="crown" v-if="isVip"></div>
            </div>
            <p class="nickname">{{userInfo && userInfo.nickname}}</p>
            <!-- <p class="privileges" @click="goto('unlimited-vip')">
                {{ $t('001781') }}
            </p> -->
        </div>
        <div class="container">
            <ul class="mobile-list-items">
                <li class="mobile-list-items__item item-1" @click="goto('info')">{{ $t("001263") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-2" @click="goto('orders')">{{ $t("001264") }}
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
import { getNativeData, } from '@/utils/index';
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'accountMenu',
    components: {
        MobileHeader,
    },
    data() {
        return {
            userInfo: null,
            licenseInfo: null,
            isVip: false,
        };
    },

    created: function() {
        this.getUserInfo();
        this.getLincenseInfo();
    },
    methods: {
        getUserInfo() {
            try {
                this.userInfo = getNativeData()['userInfo'];
            } catch (error) {
            }
        },
        goto(path) {
            this.$router.push({ path, });
        },
        getLincenseInfo() {
            this.$store.dispatch('GetLicenseInfo');
            try {
                this.licenseInfo = getNativeData()['license_info'];
                this.isVip = this.licenseInfo.is_activated === '1';
            } catch (error) {
            }
        },
    },
};
</script>

<template>
    <div class="mobile-third-party-login">
        <div class="mobile-third-party-login__container" v-if="showZhLogin">
            <div class="mobile-third-party-login__weixin" @click="processThirdPartyLogin('weixin')">
            </div>
            <div class="mobile-third-party-login__qq" @click="processThirdPartyLogin('qq')">
            </div>
            <div class="mobile-third-party-login__weibo" @click="processThirdPartyLogin('weibo')">
            </div>
            <div class="mobile-third-party-login__dingding" @click="processThirdPartyLogin('dingding')">
            </div>
        </div>
        <div class="mobile-third-party-login__container" v-if="!showZhLogin">
            <div class="mobile-third-party-login__facebook" @click="processThirdPartyLogin('facebook')">
            </div>
            <div class="mobile-third-party-login__google" @click="processThirdPartyLogin('google')">
            </div>
            <div class="mobile-third-party-login__twitter" @click="processThirdPartyLogin('twitter')">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileThirdPartyLogin',

    componentName: 'MobileThirdPartyLogin',

    props: {
        isZh: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            showZhLogin: false,
        };
    },

    created() {
        this.showZhLogin = this.isZh;
    },

    methods: {
        processThirdPartyLogin(thirdParty) {
            if (thirdParty === 'weixin') {

            }
        },
    },
};
</script>

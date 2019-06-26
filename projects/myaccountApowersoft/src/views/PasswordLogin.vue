<template>
    <div class="myaccount-password-login myaccount-form-page has-header">
        <MobileHeader
            defaultLeft
            :title='$t("001166")'
        >
        </MobileHeader>
        <div class="row" style="margin-top: 71px;">
            <form>
                <MobileInput
                    ref="accountInput"
                    v-model="account"
                    :placeholder='$t("001200")'
                    max="50"
                    :rules="accountRules"
                ></MobileInput>
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    :placeholder='$t("001201")'
                    max="20"
                    :rules="passwordRules"
                ></MobileInput>
            </form>
        </div>
        <div class="row link-wrapper">
            <span class="link left-link" @click="goto('password-less')">{{ $t("001170") }}</span>
            <span class="link right-link" @click="goto('find-password')">{{ $t("001169") }}</span>
        </div>
        <div class="row">
            <span class="btn btn-primary" @click="login()">
                <span class="loading" v-if="loading">
                    <Icon type="spinner spin" />
                </span>
                {{ $t("001166") }}
            </span>
            <span class="btn btn-white" @click="goto('register')">{{ $t("001171") }}</span>
        </div>
        <div class="row">
            <!-- 根据是否中文显示不同的第三方登陆 -->
            <!-- <MobileThirdPartyLogin :isZh="lang === 'zh'"></MobileThirdPartyLogin> -->
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileThirdPartyLogin from '@/components/ThirdPartyLogin.vue';
import { getQueryValue, } from '@lib/utils/index';
import weixinApi from '@lib/utils/weixin';

export default {
    name: 'passwordLogin',
    components: {
        Icon,
        MobileInput,
        MobileThirdPartyLogin,
        MobileHeader,
    },
    data() {
        return {
            loading: false,
            account: null,
            password: null,
            accountRules: [
                {
                    type: 'required',
                    message: this.$t('001217'),
                },
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: this.$t('001213'),
                },
            ],
            lang: null,
        };
    },

    created: function() {
        this.lang = this.$i18n.locale;

        // 微信公众号内自动登陆
        let code = getQueryValue('code');
        let state = getQueryValue('state');

        //  如果带有这两个参数，表明是从微信回调回来
        if (code && state) {
            this.loading = true;
            autoLoginByCode(code);
        }

        let _this = this;

        async function autoLoginByCode(code) {
            let result = await weixinApi.getUserInfo(code);
            if (result && result.data) {
                let userInfo = result.data.user;
                _this.$store.dispatch('loginByUniqueId', {
                    unique_id: userInfo.unionid,
                    open_id: userInfo.openid,
                    language: _this.$i18n.locale,
                }).then(() => {
                    _this.$router.push({ path: '/account-menu', });
                    _this.loading = false;
                }).catch(() => {
                    _this.$toast.show({
                        text: _this.$t('001220'),
                    });
                    _this.loading = false;
                });
            }
        }
    },

    methods: {
        login() {
            if (this.loading) {
                this.$toast.show({
                    text: this.$t('001759'),
                });
                return false;
            }
            this.loading = true;
            this.$refs.accountInput.validate();
            this.$refs.passwordInput.validate();
            if (this.$refs.accountInput.isValid && this.$refs.passwordInput.isValid) {
                this.$store.dispatch('LoginByUsername', {
                    account: this.account,
                    password: this.password,
                    language: this.$i18n.locale,
                }).then(() => {
                    this.$router.push({ path: '/account-menu', });
                    this.loading = false;
                }).catch(() => {
                    this.$toast.show({
                        text: this.$t('001220'),
                    });
                    this.loading = false;
                });
            } else {
                this.loading = false;
            }
        },
        goto(path) {
            this.$router.push({ path, });
        },
    },
};
</script>

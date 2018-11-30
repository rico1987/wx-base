<template>
    <div class="myaccount-password-login myaccount-form-page">
        <h1>{{ $t("001166") }}</h1>
        <div class="row">
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
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import MobileInput from '@/components/MobileInput.vue';

export default {
    name: 'passwordLogin',
    components: {
        Icon,
        MobileInput,
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
        };
    },

    created: function() {
    },

    methods: {
        login() {
            if (this.loading) {
                this.$toast.show({
                    text: '请稍等',
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
                }).then((res) => {
                    this.$router.push({ path: '/account-menu', });
                    this.loading = false;
                }).catch((error) => {
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

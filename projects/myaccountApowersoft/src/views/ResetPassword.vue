<template>
    <div class="myaccount-reset-password has-header">
         <MobileHeader
            defaultLeft
            :title='$t("001181")'
        >
        </MobileHeader>
        <div class="container">
            <form style="padding-top: 25px;">
                <MobileInput
                    ref="showNameInput"
                    type="text"
                    v-model="showName"
                    max="50"
                    :defaultValue="showName"
                    :disabled=true
                ></MobileInput>
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    placeholder='New password'
                    max="20"
                    :rules="passwordRules"
                    @on-blur="passwordBlur"
                ></MobileInput>
                <MobileInput
                    ref="confirmPasswordInput"
                    type="password"
                    v-model="confirmPassword"
                    placeholder='Confirm password'
                    max="20"
                    :rules="confirmPasswordRules"
                    @on-blur="confirmPasswordBlur"
                ></MobileInput>
            </form>
            <div class="row">
                <span class="btn btn-primary" @click="resetPassword()">
                    <span class="loading" v-if="loading">
                        <Icon type="spinner spin" />
                    </span>
                    {{ $t('001410') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Icon from '@/components/Icon.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileInput from '@/components/MobileInput.vue';

export default {
    name: 'resetPassword',
    components: {
        MobileHeader,
        MobileInput,
        Icon,
    },
    data() {
        return {
            showName: null,
            password: null,
            confirmPassword: null,
            passwordRules: [
                {
                    type: 'required',
                    message: this.$t('001213'),
                },
                {
                    type: 'min-length',
                    value: 6,
                    message: this.$t('001774'),
                },
            ],
            confirmPasswordRules: [
                {
                    type: 'required',
                    message: this.$t('001796'),
                },
            ],
            loading: false,
        };
    },

    created: function() {
        let saveData = Cookies.get('userInfo');
        try {
            this.userInfo = JSON.parse(saveData);
            this.showName = this.userInfo.email || this.userInfo.nickname;
        } catch (error) {
        }
    },

    methods: {
        passwordBlur: function() {
            this.$refs.passwordInput.validate();
        },
        confirmPasswordBlur: function() {
            this.$refs.confirmPasswordInput.validate();
            if (this.password !== this.confirmPassword) {
                this.$refs.confirmPasswordInput.showErrorMessage(this.$t('001797'));
            }
        },

        resetPassword: function() {
            if (this.loading) {
                this.$toast.show({
                    text: this.$t('001782'),
                });
                return false;
            }
            this.loading = true;
            this.$refs.passwordInput.validate();
            this.$refs.confirmPasswordInput.validate();
            if (this.$refs.passwordInput.isValid && this.$refs.confirmPasswordInput.isValid) {
                if (this.password !== this.confirmPassword) {
                    this.$refs.confirmPasswordInput.showErrorMessage(this.$t('001353'));
                    this.loading = false;
                    return false;
                }
                this.$store.dispatch('ResetPassword', {
                    account: this.userInfo.user_id,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    language: this.$i18n.locale,
                }).then(() => {
                    this.$router.push({ path: '/account-menu', });
                    this.loading = false;
                }).catch(() => {
                    this.$toast.show({
                        text: this.$t('001775'),
                    });
                    this.loading = false;
                });
            } else {
                this.loading = false;
                return false;
            }
        },
    },
};
</script>

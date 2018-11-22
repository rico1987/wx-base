<template>
    <div class="myaccount-password-login myaccount-form-page">
        <h1>Login</h1>
        <div class="row">
            <form>
                <MobileInput
                    ref="accountInput"
                    v-model="account"
                    placeholder='Email/Phone number'
                    max="50"
                    :rules="accountRules"
                ></MobileInput>
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    placeholder='Password'
                    max="20"
                    :rules="passwordRules"
                ></MobileInput>
            </form>
        </div>
        <div class="row link-wrapper">
            <span class="link left-link" @click="gotoPasswordLessLogin()">Password-less login</span>
            <span class="link right-link" @click="gotoResetPassword()">Forgot Password?</span>
        </div>
        <div class="row">
            <span class="btn btn-primary" @click="login()">
                <span class="loading" v-if="loading">
                    <Icon type="spinner spin" />
                </span>
                Login
            </span>
            <span class="btn btn-white" @click="gotoRegistration()">Registration</span>
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
                    message: '请输入手机或邮箱',
                },
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: '请输入密码',
                },
                {
                    type: 'regex',
                    value: /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)+$/,
                    message: '请输入正确的邮箱格式',
                },
            ],
        };
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
                }).then((res) => {
                    this.$router.push({ path: '/info', });
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                    this.$toast.show({
                        text: '账号或密码错误',
                    });
                    this.loading = false;
                });
            } else {
                this.loading = false;
            }
        },
        gotoPasswordLessLogin() {
            this.$router.push('/password-less');
        },
        gotoResetPassword() {
            this.$router.push('/reset-password');
        },
        gotoRegistration() {
            this.$router.push('/register');
        },
    },
};
</script>

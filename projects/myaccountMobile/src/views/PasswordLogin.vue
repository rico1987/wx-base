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
            <span class="btn btn-white">Registration</span>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import MobileInput from '@/components/MobileInput.vue';
import { login, } from '@/api/account';

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
                debugger;
                login(this.account, this.password)
                    .then((res) => {
                        if (res.data && res.data.status === '1') {
                            // save data to cookie

                        } else {
                            this.$toast.show({
                                text: '登陆出现错误',
                            });
                        }
                        this.loading = false;

                    })
                    .catch((error) => {
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
    },
};
</script>

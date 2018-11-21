<template>
    <div class="myaccount-password-login myaccount-form-page">
        <h1>Login</h1>
        <div class="row">
            <form>
                <MobileInput
                    ref="accountInput"
                    v-model="account"
                    placeholder='Email/Phone number'
                ></MobileInput>
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    placeholder='Password'
                    max="20"
                ></MobileInput>
            </form>
        </div>
        <div class="row link-wrapper">
            <span class="link left-link">Password-less login</span>
            <span class="link right-link">Forgot Password?</span>
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
        };
    },

    methods: {
        login() {
            this.loading = true;

        },
    },
};
</script>

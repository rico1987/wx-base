<template>
    <div class="myaccount-reset-password">
         <MobileHeader
            defaultLeft
            title="Change Password"
        >
        </MobileHeader>
        <div class="container">
            <form>
                <MobileInput
                    ref="showNameInput"
                    type="text"
                    v-model="showName"
                    max="50"
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
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileInput from '@/components/MobileInput.vue';

export default {
    name: 'resetPassword',
    components: {
        MobileHeader,
        MobileInput,
    },
    data() {
        return {
            showName: null,
            password: null,
            confirmPassword: null,
            passwordRules: [
                {
                    type: 'required',
                    message: '请输入密码',
                },
            ],
            confirmPasswordRules: [
                {
                    type: 'required',
                    message: '请再次输入密码',
                },
            ],
        };
    },

    created: function() {
        let saveData = Cookies.get('userInfo');
        try {
            this.userInfo = JSON.parse(saveData);
            this.showName = this.userInfo.email || this.userInfo.nickname;
            this.$refs.showNameInput.setValue(this.showName);
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
                this.$refs.confirmPasswordInput.showErrorMessage('两次输入密码不一致');
            }
        },
    },
};
</script>

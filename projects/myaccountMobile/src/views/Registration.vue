<template>
    <div class="myaccount-registration myaccount-form-page">
        <h1>Register</h1>
        <div class="row switch">
            <span :class="{active: activeTab === 'phone'}" @click="setActiveTab('phone')">Phone<span></span></span>
            <span :class="{active: activeTab === 'email'}" @click="setActiveTab('email')">Email<span></span></span>
        </div>
        <form>
            <div class="row">
                <MobileInput
                    v-if="activeTab === 'email'"
                    ref="emailInput"
                    v-model="email"
                    placeholder='Email'
                    max="50"
                    :rules="emailRules"
                ></MobileInput>
            </div>
            <div class="row">
                <MobileInput
                    ref="vcodeInput"
                    v-model="vcode"
                    placeholder='Verification Code'
                    max="10"
                    :showClearBtn=false
                    :rules="vcodeRules"
                >
                    <span slot="right" @click="sendCode()">Send</span>
                </MobileInput>
            </div>
            <div class="row">
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    placeholder='Password'
                    max="20"
                    :rules="passwordRules"
                ></MobileInput>
            </div>
        </form>
        <div class="row">

        </div>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';

export default {
    name: 'registration',
    components: {
        MobileInput,
    },
    data() {
        return {
            email: null,
            vcode: null,
            password: null,
            activeTab: 'email',
            emailRules: [
                {
                    type: 'required',
                    message: '请输入邮箱',
                },
            ],
            vcodeRules: [
                {
                    type: 'required',
                    message: '请输入验证码',
                },
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: '请输入密码',
                }
            ],
        };
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },

        sendCode() {

        },
    },
};
</script>

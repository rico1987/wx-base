<template>
    <div class="myaccount-registration myaccount-form-page">
        <h1>Register</h1>
        <div class="row switch">
            <span
                :class="{active: activeTab === 'phone'}"
                @click="setActiveTab('phone')"
            >Phone<span></span></span>
            <span
                :class="{active: activeTab === 'email'}"
                @click="setActiveTab('email')"
            >Email<span></span></span>
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
                    @on-blur="emailOnBlur"
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
                    <span slot="right" @click="sendCode()">
                        <span v-if="countDown">
                            {{countDown}}
                        </span>
                        <span v-else>
                            Send
                        </span>
                    </span>
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
            <span class="btn btn-primary" @click="register()">
                <span class="loading" v-if="loading">
                    <Icon type="spinner spin" />
                </span>
                Register
            </span>
        </div>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';
import { sendVcode, } from '@/api/account';

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
            countDown: 0,
            interval: null,
            loading: false,
            emailRules: [
                {
                    type: 'required',
                    message: '请输入邮箱',
                },
                {
                    type: 'regex',
                    value: /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)+$/,
                    message: '请输入正确的邮箱地址',
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
                },
            ],
        };
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },

        sendCode() {
            if (!this.countDown) {
                if (this.activeTab === 'email') {
                    this.$refs.emailInput.validate();
                    if (this.$refs.emailInput.isValid) {
                        sendVcode({
                            email: this.email,
                            scene: 'register',
                            // todo
                            language: 'zh',
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: '邮件发送成功!',
                                    });
                                    this.countDown = 60;
                                    this.interval = setInterval(() => {
                                        if (this.countDown > 0) {
                                            this.countDown -= 1;
                                        }
                                        if (this.countDown === 0) {
                                            if (this.interval) {
                                                clearInterval(this.interval);
                                            }
                                        }
                                        console.log(this.countDown);
                                    }, 1000);
                                } else {
                                    this.$toast.show({
                                        text: '邮件发送失败!',
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -208) {
                                    this.$toast.show({
                                        text: '该邮箱已注册!',
                                    });
                                } else if (error.status === -210) {
                                    this.$toast.show({
                                        text: '超过每日发送限制!',
                                    });
                                } else {
                                    this.$toast.show({
                                        text: '邮件发送失败!',
                                    });
                                }
                            });
                    }
                } else {
                }
            }

        },

        emailOnBlur() {
            this.$refs.emailInput.validate();
        },

        register() {

        },
    },
};
</script>

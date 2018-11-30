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
                    type="text"
                    v-model="email"
                    placeholder='Email'
                    max="50"
                    :rules="emailRules"
                    @on-blur="emailOnBlur"
                ></MobileInput>
                <MobileInput
                    v-if="activeTab === 'phone'"
                    type="tel"
                    ref="phoneInput"
                    v-model="phone"
                    :placeholder='$t("001204")'
                    max="50"
                    :rules="phoneRules"
                    :areaCodes="areaCodes"
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
                            Get
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
                    :showClearBtn=false
                    :showSwitchPassword=true
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
import { sendVcode, getAreaCodes, } from '@/api/account';

export default {
    name: 'registration',
    components: {
        MobileInput,
    },
    data() {
        return {
            email: null,
            phone: null,
            vcode: null,
            password: null,
            activeTab: 'phone',
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
            phoneRules: [
                {
                    type: 'required',
                    message: this.$t('001221'),
                },
                {
                    type: 'regex',
                    value: /^\d{7,14}$/,
                    message: '请输入有效手机号码！',
                },
            ],
            areaCodes: [],
        };
    },

    created: function() {
        this.getAreaCodesList();
    },

    methods: {

        getAreaCodesList() {
            getAreaCodes(this.$i18n.locale)
                .then((res) => {
                    if (res.data && res.data.status === '1') {
                        let arr = [];
                        for (let i = 0; i < res.data.data.length; i += 1) {
                            arr.push({
                                code: res.data.data[i].split(':')[0],
                                country: res.data.data[i].split(':')[1],
                            });
                        }
                        this.areaCodes = arr.concat([]);
                        this.$refs.phoneInput.setActiveAreaCode(this.areaCodes[0]);
                    } else {

                    }
                });
        },

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
                            language: this.$i18n.locale,
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
                    if (this.$refs.phoneInput.isValid) {
                        let areaCode = this.$refs.phoneInput.getAreaCode();
                        if (!areaCode || !areaCode.code) {
                            this.$toast.show({
                                text: '请选择国家或地区!',
                            });
                        }
                        sendVcode({
                            telephone: this.phone,
                            country_code: areaCode.code,
                            scene: 'register',
                            language: this.$i18n.locale,
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: '短信发送成功!',
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
                                    }, 1000);
                                } else {
                                    this.$toast.show({
                                        text: '短信发送失败!',
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -208) {
                                    this.$toast.show({
                                        text: '该手机已注册!',
                                    });
                                } else if (error.status === -210) {
                                    this.$toast.show({
                                        text: '超过每日发送限制!',
                                    });
                                } else {
                                    this.$toast.show({
                                        text: '短信发送失败!',
                                    });
                                }
                            });
                    }
                }
            }

        },

        emailOnBlur() {
            this.$refs.emailInput.validate();
        },

        register() {
            if (this.loading) {
                this.$toast.show({
                    text: '请稍等',
                });
                return false;
            }
            if (this.activeTab === 'phone') {
                this.$refs.phoneInput.validate();
                this.$refs.vcodeInput.validate();
                this.$refs.passwordInput.validate();
                let areaCode = this.$refs.phoneInput.getAreaCode();
                if (!areaCode || !areaCode.code) {
                    this.$toast.show({
                        text: '请选择国家或地区!',
                    });
                }
                if (this.$refs.phoneInput.isValid && this.$refs.vcodeInput.isValid && this.$refs.passwordInput.isValid) {
                    this.$store.dispatch('PhoneRegister', {
                        captcha: this.vcode,
                        areaCode: areaCode.code,
                        language: this.$i18n.locale,
                        password: this.password,
                        phone: this.phone,
                    }).then(() => {
                        this.$toast.show({
                            text: '注册成功！',
                        });
                        setTimeout(() => {
                            this.$router.push({ path: '/account-menu', });
                        }, 1000);
                        this.loading = false;
                    }).catch((status) => {
                        if (status === -208) {
                            this.$toast.show({
                                text: '手机号已注册，请直接登陆！',
                            });
                        } else if (status === -206) {
                            this.$toast.show({
                                text: this.$t('001223'),
                            });
                        } else {
                            this.$toast.show({
                                text: '注册失败，请重试！',
                            });
                        }
                    });
                }
            } else {
                this.$refs.emailInput.validate();
                this.$refs.vcodeInput.validate();
                this.$refs.passwordInput.validate();
                if (this.$refs.emailInput.isValid && this.$refs.vcodeInput.isValid && this.$refs.passwordInput.isValid) {
                    this.$store.dispatch('EmailRegister', {
                        captcha: this.vcode,
                        language: this.$i18n.locale,
                        password: this.password,
                        email: this.email,
                    }).then(() => {
                        this.$toast.show({
                            text: '注册成功！',
                        });
                        setTimeout(() => {
                            this.$router.push({ path: '/account-menu', });
                        }, 1000);
                        this.loading = false;
                    }).catch((status) => {
                        if (status === -208) {
                            this.$toast.show({
                                text: '邮箱已注册，请直接登陆！',
                            });
                        } else if (status === -206) {
                            this.$toast.show({
                                text: this.$t('001223'),
                            });
                        } else {
                            this.$toast.show({
                                text: '注册失败，请重试！',
                            });
                        }
                    });
                }
            }
        },
    },
};
</script>

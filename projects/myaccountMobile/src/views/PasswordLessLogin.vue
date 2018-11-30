<template>
    <div class="myaccount-password-less-login myaccount-form-page">
        <h1>{{ $t("001170") }}</h1>
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
            <span class="btn btn-primary" @click="login()">
                <span class="loading" v-if="loading">
                    <Icon type="spinner spin" />
                </span>
                Login
            </span>
        </div>
        </form>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';
import { sendVcode, getAreaCodes, } from '@/api/account';

export default {
    name: 'passwordLessLogin',
    components: {
        MobileInput,
    },
    data() {
        return {
            email: null,
            phone: null,
            vcode: null,
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
                            scene: 'login',
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
                            scene: 'login',
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

        login() {
            if (this.loading) {
                this.$toast.show({
                    text: '请稍等',
                });
                return false;
            }
            if (this.activeTab === 'email') {
                this.$refs.emailInput.validate();
                this.$refs.vcodeInput.validate();
                if (this.$refs.emailInput.isValid && this.$refs.vcodeInput.isValid) {
                    this.$store.dispatch('PasswordLessLogin', {
                        captcha: this.vcode,
                        email: this.email,
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
            } else {
                this.$refs.phoneInput.validate();
                this.$refs.vcodeInput.validate();
                let areaCode = this.$refs.phoneInput.getAreaCode();
                if (!areaCode || !areaCode.code) {
                    this.$toast.show({
                        text: '请选择国家或地区!',
                    });
                    return false;
                }
                if (this.$refs.phoneInput.isValid && this.$refs.vcodeInput.isValid) {
                    this.$store.dispatch('PasswordLessLogin', {
                        captcha: this.vcode,
                        country_code: areaCode.code,
                        telephone: this.phone,
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
            }
        },
    },
};
</script>

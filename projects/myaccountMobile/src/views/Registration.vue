<template>
    <div class="myaccount-registration myaccount-form-page">
        <h1>{{ $t('001171') }}</h1>
        <div class="row switch">
            <span
                :class="{active: activeTab === 'phone'}"
                @click="setActiveTab('phone')"
            >Phone<span></span></span>
            <span
                :class="{active: activeTab === 'email'}"
                @click="setActiveTab('email')"
            >{{ $t('001206') }}<span></span></span>
        </div>
        <form>
            <div class="row">
                <MobileInput
                    v-show="activeTab === 'email'"
                    ref="emailInput"
                    type="text"
                    v-model="email"
                    placeholder='Email'
                    max="50"
                    :rules="emailRules"
                    @on-blur="emailOnBlur"
                ></MobileInput>
                <MobileInput
                    v-show="activeTab === 'phone'"
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
                             {{ $t('001172') }}
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
                {{ $t('001171') }}
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
                    message: this.$t('001222'),
                },
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: this.$t('001213'),
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

    methods: {

        setActiveTab(tab) {
            this.activeTab = tab;
            this.$refs.emailInput.clear();
            this.$refs.phoneInput.clear();
            this.$refs.vcodeInput.clear();
            this.$refs.passwordInput.clear();
            this.email = null;
            this.phone = null;
            this.vcode = null;
            this.password = null;
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
                                        text: '验证码发送成功！',
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
                                        text: '验证码发送失败！',
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -208) {
                                    this.$toast.show({
                                        text: '该邮箱已注册，请更换邮箱再试！',
                                    });
                                } else if (error.status === -210) {
                                    this.$toast.show({
                                        text: this.$t('001379'),
                                    });
                                } else {
                                    this.$toast.show({
                                        text: '验证码发送失败！',
                                    });
                                }
                            });
                    }
                } else {
                    if (this.$refs.phoneInput.isValid) {
                        let areaCode = this.$refs.phoneInput.getAreaCode();
                        if (!areaCode) {
                            this.$toast.show({
                                text: '请选择国家或地区!',
                            });
                        }
                        sendVcode({
                            telephone: this.phone,
                            country_code: areaCode,
                            scene: 'register',
                            language: this.$i18n.locale,
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: '验证码发送成功！',
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
                                        text: '验证码发送失败！',
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -208) {
                                    this.$toast.show({
                                        text: '该手机已注册，请更换手机再试或直接登陆！',
                                    });
                                } else if (error.status === -210) {
                                    this.$toast.show({
                                        text: this.$t('001380'),
                                    });
                                } else {
                                    this.$toast.show({
                                        text: '验证码发送失败！',
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
                if (!areaCode) {
                    this.$toast.show({
                        text: '请选择国家或地区!',
                    });
                }
                if (this.$refs.phoneInput.isValid && this.$refs.vcodeInput.isValid && this.$refs.passwordInput.isValid) {
                    this.$store.dispatch('PhoneRegister', {
                        captcha: this.vcode,
                        areaCode: areaCode,
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
                    }).catch((error) => {
                        if (error.status === -208) {
                            this.$toast.show({
                                text: '手机号已注册，请直接登陆！',
                            });
                        } else if (error.status === -206) {
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
                    }).catch((error) => {
                        if (error.status === -208) {
                            this.$toast.show({
                                text: '邮箱已注册，请直接登陆！',
                            });
                        } else if (error.status === -206) {
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

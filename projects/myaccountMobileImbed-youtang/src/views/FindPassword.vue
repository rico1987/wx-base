<template>
    <div class="myaccount-find-password myaccount-form-page has-header">
        <MobileHeader
            defaultLeft
            :title="$t('001174')"
        >
        </MobileHeader>
        <h1>{{ $t("001174") }}</h1>
        <div class="container">
            <div v-show="step === 1">
                <MobileInput
                    v-if="by === 'phone'"
                    type="tel"
                    ref="phoneInput"
                    v-model="phone"
                    :placeholder='$t("001204")'
                    max="50"
                    :rules="phoneRules"
                    :areaCodes="areaCodes"
                ></MobileInput>
                <MobileInput
                    v-if="by === 'email'"
                    type="text"
                    ref="emailInput"
                    v-model="email"
                    :placeholder="$t('001206')"
                    max="50"
                    :rules="emailRules"
                    @on-blur="emailOnBlur"
                ></MobileInput>
                <div class="row">
                    <span class="btn btn-primary" @click="sendCode()">{{ $t('001783') }}</span>
                </div>
                <p class="switch" v-show="by === 'phone'" @click="switchBy('email')">{{ $t('001785') }}</p>
                <p class="switch" v-show="by === 'email'" @click="switchBy('phone')">{{ $t('001786') }}</p>
            </div>
            <div v-show="step === 2">
                <p class="tip">{{ $t('001787') }}</p>
                <p class="sendTo">{{ by === 'phone' ? phone : email }}</p>
                <div class="input-group">
                    <input ref="number1" v-model="number1" type="number" maxlength="1" @keyup="focus('number2')" />
                    <input ref="number2" v-model="number2" type="number" maxlength="1" @keyup="focus('number3')" />
                    <input ref="number3" v-model="number3" type="number" maxlength="1" @keyup="focus('number4')" />
                    <input ref="number4" v-model="number4" type="number" maxlength="1" @keyup="gotoLastStep()" />
                </div>
                <p class="resend" v-if="countDown">{{ getCountDownMsg() }}</p>
                <p class="resend btn btn-primary" v-if="!countDown" @click="sendCode()">{{ $t('001789') }}</p>
            </div>
            <div v-show="step === 3">
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    :placeholder='$t("001201")'
                    max="20"
                    :rules="passwordRules"
                ></MobileInput>
                <div class="row">
                    <span class="btn btn-primary" @click="changePassword()">{{ $t('001410') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import { sendVcode, resetPassword, } from '@/api/account';
import { isNetConnect, } from '@lib/utils/embedded';

export default {
    name: 'findPassword',
    components: {
        MobileInput,
        MobileHeader,
    },
    data() {
        return {
            by: 'phone',
            loading: false,
            areaCodes: [],
            phone: null,
            email: null,
            password: null,
            countDown: 0,
            step: 1,
            number1: null,
            number2: null,
            number3: null,
            number4: null,
            phoneRules: [
                {
                    type: 'required',
                    message: this.$t('001221'),
                },
                {
                    type: 'regex',
                    value: /^\d{7,14}$/,
                    message: this.$t('001765'),
                },
            ],
            emailRules: [
                {
                    type: 'required',
                    message: this.$t('001212'),
                },
                {
                    type: 'regex',
                    value: /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)+$/,
                    message: this.$t('001764'),
                },
            ],
            passwordRules: [
                {
                    type: 'required',
                    message: this.$t('001213'),
                },
            ],
        };
    },

    computed: {

    },

    methods: {

        getCountDownMsg() {
            return this.$t('001788').replace('10', this.countDown);
        },

        sendCode() {
            // 没有网络时的提示
            if (window.account && !isNetConnect()) {
                this.$toast.show({
                    text: this.$t('001818'),
                });
                return false;
            }
            if (!this.countDown) {
                if (this.by === 'email') {
                    this.$refs.emailInput.validate();
                    if (this.$refs.emailInput.isValid) {
                        sendVcode({
                            email: this.email,
                            scene: 'resetpwd',
                            language: this.$i18n.locale,
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: this.$t('001757'),
                                    });
                                    setTimeout(() => {
                                        this.step = 2;
                                    }, 1000);
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
                                        text: this.$t('001758'),
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -208) {
                                    this.$toast.show({
                                        text: this.$t('001227'),
                                    });
                                } else if (error.status === -210) {
                                    this.$toast.show({
                                        text: this.$t('001379'),
                                    });
                                } else {
                                    this.$toast.show({
                                        text: this.$t('001758'),
                                    });
                                }
                            });
                    }
                } else {
                    this.$refs.phoneInput.validate();
                    if (this.$refs.phoneInput.isValid) {
                        let areaCode = this.$refs.phoneInput.getAreaCode();
                        if (!areaCode) {
                            this.$toast.show({
                                text: this.$t('001766'),
                            });
                        }
                        sendVcode({
                            country_code: areaCode,
                            telephone: this.phone,
                            scene: 'resetpwd',
                            language: this.$i18n.locale,
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: this.$t('001757'),
                                    });
                                    setTimeout(() => {
                                        this.step = 2;
                                    }, 1000);
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
                                        text: this.$t('001758'),
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.status === -211) {
                                    this.$toast.show({
                                        text: this.$t('001380'),
                                    });
                                } else {
                                    this.$toast.show({
                                        text: this.$t('001758'),
                                    });
                                }
                            });
                    }
                }

            }
        },

        switchBy(type) {
            this.by = type;
        },

        emailOnBlur() {
            this.$refs.emailInput.validate();
        },

        focus(inputName) {
            this.$refs[inputName].value = '';
            this.$refs[inputName].focus();
        },

        gotoLastStep() {
            this.step = 3;
        },

        changePassword() {
            // 没有网络时的提示
            if (window.account && !isNetConnect()) {
                this.$toast.show({
                    text: this.$t('001818'),
                });
                return false;
            }
            let postData;
            if (this.by === 'email') {
                postData = {
                    captcha: `${this.number1}${this.number2}${this.number3}${this.number4}`,
                    email: this.email,
                    language: this.$i18n.locale,
                    password: this.password,
                };
            } else {
                let areaCode = this.$refs.phoneInput.getAreaCode();
                postData = {
                    captcha: `${this.number1}${this.number2}${this.number3}${this.number4}`,
                    country_code: areaCode,
                    telephone: this.phone,
                    language: this.$i18n.locale,
                    password: this.password,
                };
            }
            resetPassword(postData)
                .then(() => {
                    this.$toast.show({
                        text: '修改密码成功，即将登出！',
                    });
                    setTimeout(() => {
                        this.$router.push({ path: '/login', });
                        this.loading = false;
                    }, 3000);
                }).catch(() => {
                    this.$toast.show({
                        text: this.$t('001775'),
                    });
                    this.loading = false;
                });
        },
    },
};
</script>

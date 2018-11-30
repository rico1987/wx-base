<template>
    <div class="myaccount-find-password myaccount-form-page">
        <h1>Find Password</h1>
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
                    <span class="btn btn-primary" @click="sendCode()">Next</span>
                </div>
                <p class="switch" v-show="by === 'phone'" @click="switchBy('email')">Find by Email</p>
                <p class="switch" v-show="by === 'email'" @click="switchBy('phone')">Find by Phone</p>
            </div>
            <div v-show="step === 2">
                <p class="tip">Verification code has been sent to</p>
                <p class="sendTo">{{ by === 'phone' ? phone : email }}</p>
                <div class="input-group">
                    <input ref="number1" v-model="number1" type="number" maxlength="1" @keyup="focus('number2')" />
                    <input ref="number2" v-model="number2" type="number" maxlength="1" @keyup="focus('number3')" />
                    <input ref="number3" v-model="number3" type="number" maxlength="1" @keyup="focus('number4')" />
                    <input ref="number4" v-model="number4" type="number" maxlength="1" @keyup="gotoLastStep()" />
                </div>
                <p class="resend" v-if="countDown">{{ countDown }}s to resend the code</p>
                <p class="resend btn btn-primary" v-if="!countDown" @click="sendCode()">resend</p>
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
                    <span class="btn btn-primary" @click="changePassword()">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';
import { getAreaCodes, sendVcode, resetPassword, } from '@/api/account';

export default {
    name: 'findPassword',
    components: {
        MobileInput,
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
                    message: '请输入有效手机号码！',
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
                    message: '请输入有效邮箱',
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

    created: function() {
        this.getAreaCodesList();
    },

    methods: {
        sendCode() {
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
                                        text: '验证码发送成功!',
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
                                        text: '验证码发送失败!',
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
                                        text: '验证码发送失败!',
                                    });
                                }
                            });
                    }
                } else {
                    this.$refs.phoneInput.validate();
                    if (this.$refs.phoneInput.isValid) {
                        let areaCode = this.$refs.phoneInput.getAreaCode();
                        if (!areaCode || !areaCode.code) {
                            this.$toast.show({
                                text: '请选择国家或地区!',
                            });
                        }
                        sendVcode({
                            country_code: areaCode.code,
                            telephone: this.phone,
                            scene: 'resetpwd',
                            language: this.$i18n.locale,
                        })
                            .then((res) => {
                                if (res.data.status === '1') {
                                    this.$toast.show({
                                        text: '验证码发送成功!',
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
                                        text: '验证码发送失败!',
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
                                        text: '验证码发送失败!',
                                    });
                                }
                            });
                    }
                }

            }
        },
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
                    country_code: areaCode.code,
                    telephone: this.phone,
                    language: this.$i18n.locale,
                    password: this.password,
                };
            }
            resetPassword(postData)
                .then(() => {
                    this.$router.push({ path: '/login', });
                    this.loading = false;
                }).catch(() => {
                    this.$toast.show({
                        text: '修改密码失败！',
                    });
                    this.loading = false;
                });
        },
    },
};
</script>

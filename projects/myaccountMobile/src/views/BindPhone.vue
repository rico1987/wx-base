<template>
    <div class="myaccount-bind-phone has-header">
        <MobileHeader
            defaultLeft
            :title='$t("001176")'
        >
        </MobileHeader>
        <p class="bind-warning">If you don't bind your phone number, you risk losing your account.</p>
        <div class="container">
            <MobileInput
                type="tel"
                ref="phoneInput"
                v-model="phone"
                :placeholder='$t("001204")'
                max="50"
                :rules="phoneRules"
                :areaCodes="areaCodes"
            ></MobileInput>
            <MobileInput
                ref="vcodeInput"
                v-model="vcode"
                :placeholder='$t("001205")'
                max="10"
                :showClearBtn=false
                :rules="vcodeRules"
            >
                <span slot="right" @click="sendCode()">
                    <span v-if="countDown">
                        {{countDown}}
                    </span>
                    <span v-else>
                        {{ $t("001172") }}
                    </span>
                </span>
            </MobileInput>
            <div class="row">
                <span class="btn btn-primary" @click="bindPhone()">
                    <span class="loading" v-if="loading">
                        <Icon type="spinner spin" />
                    </span>
                    {{ $t("001410") }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import { sendVcode, getAreaCodes, bindPhone, } from '@/api/account';

export default {
    name: 'bindPhone',
    components: {
        MobileHeader,
        MobileInput,
    },
    data() {
        return {
            phone: null,
            vcode: null,
            countDown: 0,
            interval: null,
            loading: false,
            areaCodes: [],
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
            vcodeRules: [
                {
                    type: 'required',
                    message: this.$t('001222'),
                },
            ],
        };
    },

    methods: {
        sendCode() {
            if (!this.countDown) {
                this.$refs.phoneInput.validate();
                if (this.$refs.phoneInput.isValid) {
                    let areaCode = this.$refs.phoneInput.getAreaCode();
                    if (!areaCode) {
                        this.$toast.show({
                            text: '请选择国家或地区!',
                        });
                    }
                    sendVcode({
                        country_code: areaCode,
                        telephone: this.phone,
                        scene: 'bind',
                        language: this.$i18n.locale,
                    })
                        .then((res) => {
                            if (res.data.status === '1') {
                                this.$toast.show({
                                    text: '验证码发送成功!',
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
        },
        bindPhone() {
            if (this.loading) {
                this.$toast.show({
                    text: '请稍等',
                });
                return false;
            }
            this.$refs.phoneInput.validate();
            this.$refs.vcodeInput.validate();
            let areaCode = this.$refs.phoneInput.getAreaCode();
            if (!areaCode) {
                this.$toast.show({
                    text: '请选择国家或地区!',
                });
            }
            let saveData = Cookies.get('userInfo');
            let userInfo;
            let userId;
            try {
                userInfo = JSON.parse(saveData);
                userId = userInfo.user_id;
            } catch (error) {
            }

            if (this.$refs.phoneInput.isValid && this.$refs.vcodeInput.isValid) {
                bindPhone(userId, this.phone, this.vcode, areaCode, this.$i18n.locale)
                    .then((res) => {
                        if (res.data.status === '1') {
                            this.$toast.show({
                                text: this.$t('001232'),
                            });
                            setTimeout(() => {
                                this.$router.push({ path: '/account-menu', });
                            }, 1000);
                        } else {
                            this.$toast.show({
                                text: '绑定手机失败！',
                            });
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        if (error.status === -204) {
                            this.$toast.show({
                                text: '您已经绑定到该手机！',
                            });
                        } else if (error.status === -205) {
                            this.$toast.show({
                                text: '该手机已绑定到其他账户，请更换手机再试！',
                            });
                        } else if (error.status === -206) {
                            this.$toast.show({
                                text: this.$t('001223'),
                            });
                        } else if (error.status === -208) {
                            this.$toast.show({
                                text: '该手机已注册，请更换手机再试或直接登陆！',
                            });
                        } else {
                            this.$toast.show({
                                text: '绑定手机失败！',
                            });
                        }
                    });
            }

        },
    },
};
</script>

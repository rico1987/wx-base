<template>
    <div class="myaccount-bind-phone has-header">
        <MobileHeader
            defaultLeft
            :title='$t("001176")'
        >
        </MobileHeader>
        <p class="bind-warning">{{ $t('001755') }}</p>
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
import { getNativeData, } from '@lib/utils/embedded';
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import { sendVcode, bindPhone, } from '@/api/account';

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
                    message: this.$t('001765'),
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
                            text: this.$t('001766'),
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
                                    text: this.$t('001757'),
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
            }
        },
        bindPhone() {
            if (this.loading) {
                this.$toast.show({
                    text: this.$t('001782'),
                });
                return false;
            }
            this.$refs.phoneInput.validate();
            this.$refs.vcodeInput.validate();
            let areaCode = this.$refs.phoneInput.getAreaCode();
            if (!areaCode) {
                this.$toast.show({
                    text: this.$t('001766'),
                });
            }
            let userInfo;
            let userId;
            try {
                userInfo = getNativeData()['userInfo'];
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
                            userInfo.telephone = this.phone;
                            this.$store.dispatch('UpdateUserInfo', userInfo);
                            setTimeout(() => {
                                this.$router.push({ path: '/account-menu', });
                            }, 1000);
                        } else {
                            this.$toast.show({
                                text: this.$t('001770'),
                            });
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        if (error.status === -204) {
                            this.$toast.show({
                                text: this.$t('001767'),
                            });
                        } else if (error.status === -205) {
                            this.$toast.show({
                                text: this.$t('001768'),
                            });
                        } else if (error.status === -206) {
                            this.$toast.show({
                                text: this.$t('001223'),
                            });
                        } else if (error.status === -208) {
                            this.$toast.show({
                                text: this.$t('001769'),
                            });
                        } else {
                            this.$toast.show({
                                text: this.$t('001770'),
                            });
                        }
                    });
            }

        },
    },
};
</script>

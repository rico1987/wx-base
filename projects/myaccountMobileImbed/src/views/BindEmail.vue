<template>
    <div class="myaccount-bind-email has-header">
        <MobileHeader
            defaultLeft
            :title="$t('001176')"
        >
        </MobileHeader>
        <p class="bind-warning">{{ $t('001754') }}</p>
        <div class="container">
            <MobileInput
                type="text"
                ref="emailInput"
                v-model="email"
                :placeholder="$t('001206')"
                max="50"
                :rules="emailRules"
                @on-blur="emailOnBlur"
            ></MobileInput>
            <MobileInput
                ref="vcodeInput"
                v-model="vcode"
                :placeholder="$t('001205')"
                max="10"
                :showClearBtn=false
                :rules="vcodeRules"
                @on-blur="vcodeOnBlur"
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
            <div class="row">
                <span class="btn btn-primary" @click="bindEmail()">
                    <span class="loading" v-if="loading">
                        <Icon type="spinner spin" />
                    </span>
                    {{ $t('001410') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getNativeData, } from '@lib/utils/embedded';
import Icon from '@/components/Icon.vue';
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import { sendVcode, bindEmail, validateEmail, } from '@/api/account';

export default {
    name: 'bindEmail',
    components: {
        MobileHeader,
        MobileInput,
        Icon,
    },
    data() {
        return {
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
            vcodeRules: [
                {
                    type: 'required',
                    message: this.$t('001222'),
                },
            ],
            email: null,
            vcode: null,
            countDown: 0,
            loading: false,

        };
    },
    methods: {
        sendCode() {
            if (!this.countDown) {
                this.$refs.emailInput.validate();
                if (this.$refs.emailInput.isValid) {
                    validateEmail({
                        email: this.email,
                        language: this.$i18n.locale,
                    })
                        .then((res) => {
                            if (res.data.status === '1') {
                                if (res.data.data.result === 2) {
                                    this.$toast.show({
                                        text: this.$t('001231'),
                                    });
                                } else {
                                    sendVcode({
                                        email: this.email,
                                        scene: 'register',
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
                        })
                        .catch(() => {
                            this.$toast.show({
                                text: this.$t('001758'),
                            });
                        });
                }
            }
        },
        emailOnBlur() {
            this.$refs.emailInput.validate();
        },
        vcodeOnBlur() {
            this.$refs.vcodeInput.validate();
        },
        bindEmail() {
            if (this.loading) {
                this.$toast.show({
                    text: this.$t('001782'),
                });
                return false;
            }
            this.$refs.emailInput.validate();
            this.$refs.vcodeInput.validate();
            let userInfo;
            let userId;
            try {
                userInfo = getNativeData()['userInfo'];
                userId = userInfo.user_id;
            } catch (error) {
            }

            if (this.$refs.emailInput.isValid && this.$refs.vcodeInput.isValid) {
                bindEmail(userId, this.email, this.vcode, this.$i18n.locale)
                    .then((res) => {
                        if (res.data.status === '1') {
                            this.$toast.show({
                                text: this.$t('001233'),
                            });
                            userInfo.email = this.email;
                            this.$store.dispatch('UpdateUserInfo', userInfo);
                            setTimeout(() => {
                                this.$router.push({ path: '/account-menu', });
                            }, 1000);
                        } else {
                            this.$toast.show({
                                text: this.$t('001760'),
                            });
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                        if (error.status === -204) {
                            this.$toast.show({
                                text: this.$t('001761'),
                            });
                        } else if (error.status === -205) {
                            this.$toast.show({
                                text: this.$t('001762'),
                            });
                        } else if (error.status === -206) {
                            this.$toast.show({
                                text: this.$t('001223'),
                            });
                        } else if (error.status === -208) {
                            this.$toast.show({
                                text: this.$t('001763'),
                            });
                        } else {
                            this.$toast.show({
                                text: this.$t('001760'),
                            });
                        }
                    });
            }
        },
    },
};
</script>

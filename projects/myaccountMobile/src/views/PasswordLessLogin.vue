<template>
    <div class="myaccount-password-less-login myaccount-form-page">
        <h1>{{ $t("001170") }}</h1>
        <div class="row switch">
            <span
                :class="{active: activeTab === 'phone'}"
                @click="setActiveTab('phone')"
            >{{ $t('001795') }}<span></span></span>
            <span
                :class="{active: activeTab === 'email'}"
                @click="setActiveTab('email')"
            >{{ $t('001206') }}<span></span></span>
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
                        <span v-else v-bind:class="{ active: highlight }">
                            {{ $t('001172') }}
                        </span>
                    </span>
                </MobileInput>
            </div>
            <div class="row">
            <span class="btn btn-primary" @click="login()">
                <span class="loading" v-if="loading">
                    <Icon type="spinner spin" />
                </span>
                {{ $t('001166') }}
            </span>
        </div>
        </form>
    </div>
</template>

<script>
import MobileInput from '@/components/MobileInput.vue';
import { sendVcode, } from '@/api/account';

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
            areaCodes: [],
        };
    },

    computed: {
        highlight() {
            return (this.activeTab === 'phone' && this.phone) || (this.activeTab === 'email' && this.email);
        },
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
                            scene: 'login',
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
                                if (error.status === -210) {
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
                    if (this.$refs.phoneInput.isValid) {
                        let areaCode = this.$refs.phoneInput.getAreaCode();
                        if (!areaCode) {
                            this.$toast.show({
                                text: this.$t('001766'),
                            });
                        }
                        sendVcode({
                            telephone: this.phone,
                            country_code: areaCode,
                            scene: 'login',
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
                                if (error.status === -210) {
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

        login() {
            if (this.loading) {
                this.$toast.show({
                    text: this.$t('001759'),
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
                if (!areaCode) {
                    this.$toast.show({
                        text: this.$t('001766'),
                    });
                    return false;
                }
                if (this.$refs.phoneInput.isValid && this.$refs.vcodeInput.isValid) {
                    this.$store.dispatch('PasswordLessLogin', {
                        captcha: this.vcode,
                        country_code: areaCode,
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
        emailOnBlur() {
            this.$refs.emailInput.validate();
        },
    },
};
</script>

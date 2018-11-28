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
import MobileInput from '@/components/MobileInput.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import { sendVcode, getAreaCodes, } from '@/api/account';

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
                    message: this.$t("001221"),
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
                    message: this.$t("001222"),
                },
            ],
        };
    },
    created: function() {
        this.getAreaCodesList();
    },
    methods: {

        getAreaCodesList() {
            getAreaCodes('zh')
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
                        this.$refs.phoneInput.setActiveAreaCode(this.areaCodes[0].code);
                    } else {

                    }
                    console.log(res);
                });
        },

        sendCode() {
            if (!this.countDown) {
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
                                    console.log(this.countDown);
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
                                    text: this.$t("001227"),
                                });
                            } else if (error.status === -210) {
                                this.$toast.show({
                                    text: this.$t("001379"),
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

        },
    },
};
</script>

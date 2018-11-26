<template>
    <div class="myaccount-bind-phone">
        <MobileHeader
            defaultLeft
            title="Binding"
        >
        </MobileHeader>
        <p class="bind-warning">If you don't bind your phone number, you risk losing your account.</p>
        <div class="container">
            <MobileInput
                type="tel"
                ref="phoneInput"
                v-model="phone"
                placeholder='Phone Number'
                max="50"
                :areaCodes="areaCodes"
            ></MobileInput>
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
                if (this.activeTab === 'email') {
                    this.$refs.emailInput.validate();
                    if (this.$refs.emailInput.isValid) {
                        sendVcode({
                            email: this.email,
                            scene: 'register',
                            // todo
                            language: 'zh',
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
                                        console.log(this.countDown);
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
                }
            }

        },
    },
};
</script>

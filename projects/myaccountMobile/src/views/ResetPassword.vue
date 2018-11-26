<template>
    <div class="myaccount-reset-password">
         <MobileHeader
            defaultLeft
            title="Change Password"
        >
        </MobileHeader>
        <div class="container">
            <form>
                <MobileInput
                    ref="showNameInput"
                    type="text"
                    v-model="showName"
                    max="50"
                    :defaultValue="showName"
                    :disabled=true
                ></MobileInput>
                <MobileInput
                    ref="passwordInput"
                    type="password"
                    v-model="password"
                    placeholder='New password'
                    max="20"
                    :rules="passwordRules"
                    @on-blur="passwordBlur"
                ></MobileInput>
                <MobileInput
                    ref="confirmPasswordInput"
                    type="password"
                    v-model="confirmPassword"
                    placeholder='Confirm password'
                    max="20"
                    :rules="confirmPasswordRules"
                    @on-blur="confirmPasswordBlur"
                ></MobileInput>
            </form>
            <div class="row">
                <span class="btn btn-primary" @click="resetPassword()">
                    <span class="loading" v-if="loading">
                        <Icon type="spinner spin" />
                    </span>
                    OK
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Icon from '@/components/Icon.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileInput from '@/components/MobileInput.vue';

import { changePassword } from '@/api/account';

export default {
    name: 'resetPassword',
    components: {
        MobileHeader,
        MobileInput,
        Icon,
    },
    data() {
        return {
            showName: null,
            password: null,
            confirmPassword: null,
            passwordRules: [
                {
                    type: 'required',
                    message: '请输入密码',
                },
            ],
            confirmPasswordRules: [
                {
                    type: 'required',
                    message: '请再次输入密码',
                },
            ],
            loading: false,
        };
    },

    created: function() {
        let saveData = Cookies.get('userInfo');
        try {
            this.userInfo = JSON.parse(saveData);
            this.showName = this.userInfo.email || this.userInfo.nickname;
            // this.$refs.showNameInput.setValue(this.showName);
        } catch (error) {
        }
    },

    methods: {
        passwordBlur: function() {
            this.$refs.passwordInput.validate();
        },
        confirmPasswordBlur: function() {
            this.$refs.confirmPasswordInput.validate();
            if (this.password !== this.confirmPassword) {
                this.$refs.confirmPasswordInput.showErrorMessage('两次输入密码不一致');
            }
        },

        resetPassword: function() {
            if (this.loading) {
                this.$toast.show({
                    text: '请稍等',
                });
                return false;
            }
            this.loading = true;
            this.$refs.passwordInput.validate();
            this.$refs.confirmPasswordInput.validate();
            if (this.$refs.passwordInput.isValid && this.$refs.confirmPasswordInput.isValid) {
                if (this.password !== this.confirmPassword) {
                    this.$refs.confirmPasswordInput.showErrorMessage('两次输入密码不一致');
                    return false;
                }
                changePassword(this.userInfo.user_id, this.password, this.confirmPassword)
                    .then(res => {
                        if (res.data.status === '1') {
                            this.$toast.show({
                                text: '密码修改成功!',
                            });
                            setTimeout(() => {
                                this.$router.push({ path: '/account-menu' });
                            }, 1000);
                        } else {
                            this.$toast.show({
                                text: '密码修改失败!',
                            });
                        }
                        this.loading = false;
                    })
                    .catch((error) => {
                         this.$toast.show({
                            text: '密码修改失败!',
                        });
                         this.loading = false;
                    });

            } else {
                this.loading = false;
                return false;
            }
        },
    },
};
</script>

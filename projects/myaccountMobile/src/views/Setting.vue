<template>
    <div class="myaccount-setting has-header">
        <MobileHeader
            defaultLeft
            title="Setting"
        >
        </MobileHeader>
        <div class="container">
            <div class="row">
                <div class="left">Apowersoft will send you internal real-time communications
                    from time to time after subscription</div>
                <div class="right">
                    <MobileSwitch
                        v-model="subscription"
                        @on-change="changeSubscription"
                    ></MobileSwitch>
                </div>
            </div>
            <div class="row">
                <div class="left email">
                    <span v-if="userInfo && userInfo.email">{{ userInfo.email }}</span>
                    <span v-if="!userInfo || !userInfo.email" class="placeholder">{{ $t('001206') }}</span>
                </div>
                <div class="right">
                    <span v-if="userInfo && userInfo.email" class="outline" @click="goto('bind-email')">Change</span>
                    <span v-if="!userInfo || !userInfo.email" @click="goto('bind-email')">{{ $t('001176') }}</span>
                </div>
            </div>
            <div class="row">
                <div class="left telephone">
                    <span v-if="userInfo && userInfo.telephone">{{ userInfo.telephone }}</span>
                    <span v-if="!userInfo || !userInfo.telephone" class="placeholder">Tel</span>
                </div>
                <div class="right">
                    <span v-if="userInfo && userInfo.telephone" class="outline" @click="goto('bind-phone')">Change</span>
                    <span v-if="!userInfo || !userInfo.telephone" @click="goto('bind-phone')">{{ $t('001176') }}</span>
                </div>
            </div>
            <div>
                <span class="btn btn-primary" @click="exit()">{{ $t('001168') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';
import MobileSwitch from '@/components/MobileSwitch.vue';

export default {
    name: 'setting',
    components: {
        MobileHeader,
        MobileSwitch,
    },

    data() {
        return {
            userInfo: null,
            subscription: false,
        };
    },

    created: function() {
        let saveData = Cookies.get('userInfo');
        try {
            this.userInfo = JSON.parse(saveData);
        } catch (error) {
        }
    },

    methods: {
        changeSubscription() {
        },

        exit() {
            this.$store.dispatch('Logout');
            this.$toast.show({
                text: '退出成功',
            });
            setTimeout(() => {
                this.$router.push({ path: '/login', });
            }, 1000);
        },

        goto(path) {
            this.$router.push({ path, });
        },
    },
};
</script>

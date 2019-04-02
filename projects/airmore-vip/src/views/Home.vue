<template>
    <div class="mobile-home has-header">
        <MobileHeader
            defaultLeft
            isReturnToNative
            title="开通VIP"
        >
        </MobileHeader>
        <div class="mobile-home__content">
            <div class="mobile-home__user-info">
                <div class="mobile-home__avatar">
                    <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                    <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                    <div class="crown" v-if="isVip"></div>
                </div>
                <div class="mobile-home__account">
                    <p class="account-name" v-if="userInfo">{{ userInfo.nickname || userInfo.email || userInfo.telephone }}</p>
                    <p class="device-info">Apple iPhone8</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="mobile-home__prices">
                <div class="price active">
                    <p class="p1">12个月VIP</p>
                    <p class="p2"><span>$</span>108</p>
                    <p class="p3">9元/月</p>
                    <p class="p4">立省36元</p>
                </div>
                <div class="price">
                    <p class="p1">12个月VIP</p>
                    <p class="p2"><span>$</span>108</p>
                    <p class="p3">9元/月</p>
                    <p class="p4">立省36元</p>
                </div>
                <div class="price">
                    <p class="p1">12个月VIP</p>
                    <p class="p2"><span>$</span>108</p>
                    <p class="p3">9元/月</p>
                    <p class="p4">立省36元</p>
                </div>
            </div>
            <div class="mobile-home__buy-btn">
                <a href="">立即开通</a>
                <p>VIP账户信息会在支付成功后生效</p>
            </div>
            <div class="mobile-home__privilege">
                <h2>开通VIP独享专属特权</h2>
                <div class="p1"> 
                    <p>加10G大空间</p>
                </div>
                <div class="p2">
                    <p>无限制上传下载</p>
                </div>
                <div class="p3">
                    <p>畅享云剪切板</p>
                </div>
                <div class="p4">
                    <p>享免费升级服务</p>
                </div>
                <div class="p5">
                    <p>更多内容敬请期待</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getNativeData, saveNativeData, nativeLogin, nativeLogout, backToNative, jump, } from '@lib/utils/embedded';

import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'home',
    components: {
        MobileHeader,
    },
    data() {
        return {
            userInfo: null,
            isVip: false,
        };
    },

    created: function() {
        let saveData = getNativeData();
        this.userInfo = saveData['userInfo'];
        // 获取vip信息
        

    },
    methods: {
    },
};
</script>

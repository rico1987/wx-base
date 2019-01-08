<template>
    <div class="info-container">
        <div class="inner-container">
            <div class="info-top-bg"></div>
                <div class="info-box">
                    <div class="user-info">
                        <div class="avatar">
                            <img v-show="userInfo && userInfo.avatar" :src="userInfo.avatar">
                        </div>
                        <div class="user-name">Pavel asdf adf asdf asdf  Svitek</div>
                    </div>
                    <div class="btn active">充值中心</div>
                    <div class="btn">我的文件</div>
                    <div class="btn">社区</div>
            </div>
            <div class="btn logout-btn">退出登录</div>
            <main-bar type="user-center"></main-bar>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';

export default {
    name: 'info',
    components: {
        'main-bar': MainBar,
    },
    data() {
        return {
            userInfo: {
                // avatar: 'https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882',
            },
        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

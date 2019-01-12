<template>
    <div class="pay-container">
        <div class="inner-container">
            <pdf-header ref="header" @click-jump="onBack"></pdf-header>
            <div class="panel-one">
                <user-info :info="userInfo"></user-info>
                <div class="buy-panel">
                    <div class="plan-box">
                        <div class="plan month active">
                            <div class="img"></div>
                            <div class="des-box">
                                <div class="plan-name">月度</div>
                                <div class="plan-des">1个月会员</div>
                            </div>
                            <div class="plan-price">$9.9/月</div>
                        </div>
                        <div class="plan year">
                            <div class="img"></div>
                            <div class="des-box">
                                <div class="plan-name">月度
                                    <div class="tuijian">
                                        <div class="triangle-left"></div>
                                        <div class="tuijian-txt">推荐</div>
                                    </div>
                                </div>
                                <div class="plan-des">1个月会员</div>
                            </div>
                            <div class="plan-price">$9.9/月</div>
                        </div>
                        <div class="plan life">
                            <div class="img"></div>
                            <div class="des-box">
                                <div class="plan-name">月度</div>
                                <div class="plan-des">1个月会员</div>
                            </div>
                            <div class="plan-price">$9.9/月</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import UserInfo from '../components/userInfo.vue';

export default {
    name: 'pay',
    components: {
        'pdf-header': PdfHeader,
        'user-info': UserInfo,
    },
    data() {
        return {
            userInfo: {
                avatar: 'https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882',
                nickname: '3004197106',
            },
        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

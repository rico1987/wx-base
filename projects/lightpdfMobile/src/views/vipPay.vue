<template>
    <div class="pay-container">
        <div class="inner-container">
            <pdf-header ref="header" @click-jump="onBack"></pdf-header>
            <div class="panel-two add-header">
                <user-info :info="userInfo"></user-info>
                <div class="des-panel">
                    <div class="privilege-box">
                        <div class="des-title">开通VIP独享专属特权</div>
                        <div class="privilege-list">
                            <div class="privilege-item">
                                <div class="img free-use"></div>
                                <div class="privilege-des">享PDF转换王产品免费使用权</div>
                            </div>
                            <div class="privilege-item">
                                <div class="img custom-service"></div>
                                <div class="privilege-des">享24小时客服服务</div>
                            </div>
                            <div class="privilege-item">
                                <div class="img free-upgrade"></div>
                                <div class="privilege-des">享免费升级服务</div>
                            </div>
                        </div>
                    </div>
                    <div class="secure-box">
                        <div class="des-title">我们的承诺</div>
                        <div class="secure-list">
                            <div class="secure-item">
                                <div class="title-box">
                                    <div class="img money-back"></div>
                                    <div class="secure-des">Money-back Guarantee</div>
                                </div>
                                <div class="detail">Our products come with a 30 days Money  Back Guarantee.</div>
                            </div>
                            <div class="secure-item">
                                <div class="title-box">
                                    <div class="img safety"></div>
                                    <div class="secure-des">Secure</div>
                                </div>
                                <div class="detail">We value your privacy and protect your
financial/personal infowith advanced encryption
and advanced fraudprotection</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-btns">
                    <div class="month-btn">开通￥9.9/月</div>
                    <div class="year-btn">开通￥99/年
                        <div class="tuijian">
                            <div class="triangle-left"></div>
                            <div class="tuijian-txt">推荐</div>
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
    name: 'vipPay',
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
        onBack() {
            console.log('onback');
        },
    },
};
</script>

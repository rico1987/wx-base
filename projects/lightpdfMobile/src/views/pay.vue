<template>
    <div class="pay-container">
        <div class="inner-container">
            <pdf-header ref="header" @click-jump="onBack"></pdf-header>
            <div class="panel-one">
                <user-info :info="userInfo"></user-info>
                <div class="buy-panel">
                    <div class="plan-box">

                        <div v-for="(item,index) in planArr" :key="index"
                        :class="[item.type, item.active ? 'active' : '']"
                        class="plan"
                        @click="selectPlan(item.type)"
                        >
                            <div class="img"></div>
                            <div class="des-box">
                                <div class="plan-name">{{$tr(item.title)}}
                                    <div v-show="item.recommend" class="tuijian">
                                        <div class="triangle-left"></div>
                                        <div class="tuijian-txt">Recommend</div>
                                    </div>
                                </div>
                                <div class="plan-des">{{$tr(item.priceDes)}}</div>
                            </div>
                            <div class="plan-price">{{item.priceStr}}</div>
                        </div>
                    </div>
                </div>
                <div class="pay-btns">
                    <div class="add-to-cart" @click="payIt">Add to cart</div>
                    <div v-if="0" class="pay-with-paypal">check out with</div>
                </div>
                <div v-if="0" class="pay-des">The safer,easier way to pay</div>
                <div class="vip-des">VIP account will be sent to you by email  immediately after you</div>
            </div>
            <div class="panel-two">
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
                    <div class="month-btn" @click="openNormalPay">{{normalPlan.priceDes}}</div>
                    <div class="year-btn" @canplay="openRecommondPay">{{recommendPlan.priceDes}}
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
import payUrl from '../utils/storeUrl';
import {openUrl, } from '../utils/index';

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
                currentPlan: null,
                normalPlan: null,
                recommendPlan: null,
            },
            planArr: [],
        };
    },

    created: function() {
        console.log(payUrl);
        this.initPlanArr();
    },
    methods: {
        initPlanArr() {
            let type = this.$i18n.locale;
            console.log(type);
            let typeArr = ['1', '3', '4', ];
            if (type === 'cn') {
                typeArr = ['2', '3', '4', ];
            }
            let typeDes = {
                '1': 'month',
                '2': 'season',
                '3': 'year',
                '4': 'life',
            };
            let planObj = payUrl['link'][type];
            if (!planObj) {
                planObj = payUrl['link']['en'];
            }
            let keys = Object.keys(planObj);
            keys.sort();
            this.planArr = [];
            let item;
            let key;
            for (let i = 0; i < keys.length; i += 1) {
                key = keys[i];
                if (typeArr.indexOf(key) === -1) {
                    continue;
                }
                item = planObj[key];
                item.type = typeDes[key];
                item.priceDes = this.trstr('{0}/{1}', item.priceStr, this.$tr(item.title));
                if (this.planArr.length === 1) {
                    item.active = 1;
                    item.recommend = 1;
                    this.currentPlan = item;
                } else {
                    item.active = 0;
                    item.recommend = 0;
                }
                this.planArr.push(item);
            }
            console.log(this.planArr);
            this.normalPlan = this.planArr[0];
            this.recommendPlan = this.planArr[1];
        },
        trstr(url, ...rest) {
            // trstr('a{0}bc{0}de{1}ft, '-1-', '-2-')
            // a-1-bc-1-de-2-ft
            if (rest.length > 0) {
                let reg;
                for (let i = 0; i < rest.length; i += 1) {
                    reg = new RegExp(`\\{${i}\\}`, 'g');
                    url = url.replace(reg, rest[i]);
                }
            }
            return url;
        },
        selectPlan(type) {
            console.log('nnn', type);
            let item;
            // debugger;
            for (let i = 0; i < this.planArr.length; i += 1) {
                item = this.planArr[i];
                console.log(item.type, type);
                if (item.type === type) {
                    item.active = 1;
                    this.currentPlan = item;
                } else {
                    item.active = 0;
                }
            }
            console.log(this.planArr);
        },
        payIt() {
            if (!this.currentPlan) {
                return;
            }
            this.openPayUrl(this.currentPlan.link);
        },
        openPayUrl(url) {
            if (!url) {
                return;
            }
            let identifyStr = '';
            if (this.$i18n.locale === 'cn' && this.account && this.account['identity_token']) {
                identifyStr = `&identity_token=${this.account['identity_token']}`;
                url = `url${identifyStr}`;
            }
            if (window.account) {
                openUrl(url);
            } else {
                window.open(url);
            }
        },
        onBack() {
            console.log('onback');
        },
        openNormalPay() {
            if (this.normalPlan) {
                this.openPayUrl(this.normalPlan.link);
            }
        },
        openRecommondPay() {
            if (this.recommendPlan) {
                this.openPayUrl(this.recommendPlan.link);
            }
        },
    },
};
</script>

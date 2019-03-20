<template>
    <div class="pay-container">
        <div class="inner-container" ref="aaa" @touchmove="onTouchMove">
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
                                        <div class="tuijian-txt">{{$tr('Recommend@@002039')}}</div>
                                    </div>
                                </div>
                                <div class="plan-des">{{$tr(item.priceDes)}}</div>
                            </div>
                            <div class="plan-price">{{item.priceStr}}</div>
                        </div>
                    </div>
                </div>
                <div class="pay-btns">
                    <div class="add-to-cart" ref="attBtn" @click="payIt">{{$tr('Add to cart@@002040')}}</div>
                    <div v-if="0" class="pay-with-paypal">check out with</div>
                </div>
                <div v-if="0" class="pay-des">The safer,easier way to pay</div>
                <div class="vip-des">{{$tr('VIP account will be sent to you by email immediately after your payment@@002151')}}</div>
            </div>
            <div class="panel-two">
                <div class="des-panel">
                    <div class="privilege-box">
                        <div class="des-title">{{$tr('Privileges of Being VIP Members@@002152')}}</div>
                        <div class="privilege-list">
                            <div class="privilege-item">
                                <div class="img free-use"></div>
                                <div class="privilege-des">{{$tr('Free usage of PDF Converter@@002153')}}</div>
                            </div>
                            <div class="privilege-item">
                                <div class="img custom-service"></div>
                                <div class="privilege-des">{{$tr('24-hour support service@@002154')}}</div>
                            </div>
                            <div class="privilege-item">
                                <div class="img free-upgrade"></div>
                                <div class="privilege-des">{{$tr('Free update service@@002155')}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="secure-box">
                        <div class="des-title">{{$tr('Our Promises@@002156')}}</div>
                        <div class="secure-list">
                            <div class="secure-item">
                                <div class="title-box">
                                    <div class="img money-back"></div>
                                    <div class="secure-des">{{$tr('Money-back Guarantee@@002035')}}</div>
                                </div>
                                <div class="detail">{{$tr('Our products come with a 30 days Money Back Guarantee.@@002036')}}</div>
                            </div>
                            <div class="secure-item">
                                <div class="title-box">
                                    <div class="img safety"></div>
                                    <div class="secure-des">{{$tr('Secure@@002037')}}</div>
                                </div>
                                <div class="detail">{{$tr('We value your privacy and protect your financial/personal info with advanced encryption and advanced fraud protection.@@002038')}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-btns" :class="bottomBtnState">
                    <div class="month-btn" @click="openNormalPay">{{normalPlan.priceDes}}</div>
                    <div class="year-btn" @click="openRecommondPay">{{recommendPlan.priceDes}}
                    </div>
                </div>
            </div>
            <pay-result ref="payResult"></pay-result>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import PayResult from '../components/payResult.vue';
import UserInfo from '../components/userInfo.vue';
import payUrl from '../utils/storeUrl';
import {openUrl, getNativeData, isoPay, getIosProductPrice, } from '../utils/index';

export default {
    name: 'pay',
    components: {
        'pdf-header': PdfHeader,
        'user-info': UserInfo,
        'pay-result': PayResult,
    },
    data() {
        return {
            userInfo: {
                avatar: '',
                nickname: '',
            },
            en: {
                '2': '8181810004',
                '3': '8181810005',
                '4': '8181810006',
            },
            cn: {
                '2': '8181810001',
                '3': '8181810002',
                '4': '8181810003',
            },
            iosPrice: {
                '8181810006': '$59.95',
                '8181810005': '$39.95',
                '8181810004': '$29.95',
                '8181810003': '￥99',
                '8181810002': '￥79',
                '8181810001': '￥59',
            },
            currentPlan: null,
            normalPlan: null,
            recommendPlan: null,
            planArr: [],
            bottomBtnState: '',

        };
    },

    created: function() {
        console.log(payUrl);
        if (process.isIos === '1') {
            window.setIosProductPrice = this.setPlan;
            this.initIosPlan();
        } else {
            this.initPlanArr();
        }
        let data = getNativeData();
        if (data['userInfo']) {
            this.userInfo = data['userInfo'];
        }
    },
    methods: {
        initPlanArr() {
            let type = this.$i18n.locale;
            console.log(type);
            let typeArr = ['2', '3', '4', ];
            // if (type === 'cn') {
            //     typeArr = ['2', '3', '4', ];
            // }
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
            this.normalPlan = this.planArr[1];
            this.recommendPlan = this.planArr[2];
        },
        initIosPlan() {
            let type = this.$i18n.locale;
            console.log(type);
            let typeArr = ['2', '3', '4', ];
            let typeDes = {
                '1': 'month',
                '2': 'season',
                '3': 'year',
                '4': 'life',
            };
            let langType = 'cn';
            if (type !== 'cn') {
                langType = 'en';
            }
            let idObj = this[langType];
            console.log(idObj);
            let iosIdArr = Object.values(idObj);
            console.log(iosIdArr);
            console.log('-0-0-0-00-0-');
            let price = getIosProductPrice(JSON.stringify(iosIdArr));
            if (!price || Object.keys(price).length === 0) {
                price = this.iosPrice;
            }
            console.log(price);
            console.log('price obj');
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
                item.iosId = idObj[key];
                item.type = typeDes[key];
                if (price[item.iosId]) {
                    item.priceStr = price[item.iosId];
                }
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
            this.normalPlan = this.planArr[1];
            this.recommendPlan = this.planArr[2];
        },
        setPlan(str) {
            console.log('set price', str);
            if (!str) {
                return;
            }
            let price = JSON.parse(str);
            let item = null;
            for (let i = 0; i < this.planArr.length; i += 1) {
                item = this.planArr[i];
                if (price[item.iosId]) {
                    this.iosPrice[item.iosId] = price[item.iosId];
                    item.priceStr = price[item.iosId];
                    item.priceDes = this.trstr('{0}/{1}', item.priceStr, this.$tr(item.title));
                }
            }
        },
        getProductPrice() {
            // var promise = new Promise((resolve,reject)=>{
            //     let url1 = '/toutiao/index?type=top&key=秘钥'
            //     this.get(url,{})
            //     .then((res)=>{
            //         resolve(res);
            //     })
            //     .catch((err)=>{
            //         console.log(err)
            //     })
            // });
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
            if (process.isIos === '1') {
                // iosId
                isoPay(this.currentPlan['iosId']);
                return;
            }
            this.openPayUrl(this.currentPlan.link);
        },
        openPayUrl(url) {
            if (!url) {
                return;
            }
            let identifyStr = '';
            let data = getNativeData();
            console.log('this.$i18n.locale', this.$i18n.locale);
            console.log(data['identity_token']);
            if (this.$i18n.locale === 'cn' && data['identity_token']) {
                identifyStr = `&identity_token=${data['identity_token']}`;
                url = `${url}${identifyStr}`;
            }
            if (window.account) {
                openUrl(url);
            } else {
                window.open(url);
            }
            this.$refs.payResult.show();
            this.$refs.payResult.payUrl = url;
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
        onTouchMove(e) {
            this.$refs.aaa.scrollTop;
            console.log(this.$refs.aaa.scrollTop);
            console.log(this.$refs.attBtn.getBoundingClientRect());
            let rect = this.$refs.attBtn.getBoundingClientRect();
            if (rect.top < 50) {
                this.bottomBtnState = 'to-fixed';
            } else {
                this.bottomBtnState = '';
            }
            console.log(e);
        },
    },
};
</script>

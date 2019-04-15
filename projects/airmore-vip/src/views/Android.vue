<template>
    <div class="mobile-home has-header">
        <MobileHeader
            defaultLeft
            isReturnToNative
            :title="$t('000001')"
        >
        </MobileHeader>
        <div class="mobile-home__content">
            <div class="mobile-home__user-info">
                <div class="mobile-home__avatar">
                    <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                    <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                    <div class="crown" v-bind:class="{ active: isVip }"></div>
                </div>
                <div class="mobile-home__account">
                    <p class="account-name" v-if="userInfo">{{ userInfo.nickname || userInfo.email || userInfo.telephone }}</p>
                    <p class="device-info" v-if="model && !isVip">{{ model }}</p>
                    <p class="expire" v-if="isVip && !isLifeTime">{{$t('000014', {'0': expire_date})}}</p>
                    <p class="expire" v-if="isVip && isLifeTime">{{$t('000001')}}</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="mobile-home__prices" v-if="prices">
                <div class="price" v-bind:class="{ active: activeProductId === 0 }"  @click="setActive(0)">
                    <p class="p1">{{prices[0]['title']}}</p>
                    <p class="p2"><span>{{prices[0]['currency']}}</span>{{prices[0]['price']}}</p>
                    <p class="p3">{{prices[0]['currency']}}{{parseInt(prices[0]['price'] / 12)}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000003')}}{{prices[0]['currency']}}{{prices[0]['save']}}</p>
                    <p class="recommended">{{$t('000004')}}</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === 1 }" @click="setActive(1)">
                    <p class="p1">{{prices[1]['title']}}</p>
                    <p class="p2"><span>{{prices[1]['currency']}}</span>{{prices[1]['price']}}</p>
                    <p class="p3">{{prices[1]['currency']}}{{parseInt(prices[1]['price'] / 3)}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000003')}}{{prices[1]['currency']}}{{prices[1]['save']}}</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === 2 }" @click="setActive(2)">
                    <p class="p1">{{prices[2]['title']}}</p>
                    <p class="p2"><span>{{prices[2]['currency']}}</span>{{prices[2]['price']}}</p>
                    <p class="p3">{{prices[2]['currency']}}{{prices[2]['price']}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000005')}}</p>
                </div>
            </div>
            <div class="mobile-home__buy-btn">
                <span v-if="!isVip" class="btn" @click="gotoBuy()">{{$t('000006')}}</span>
                <span v-if="isVip" class="btn" @click="gotoBuy()">{{$t('000019')}}</span>
                <p>{{$t('000007')}}</p>
            </div>
            <div class="mobile-home__privilege">
                <h2>{{$t('000008')}}</h2>
                <div class="p1">
                    <p>{{$t('000009')}}</p>
                </div>
                <div class="p2">
                    <p>{{$t('000010')}}</p>
                </div>
                <div class="p3">
                    <p>{{$t('000011')}}</p>
                </div>
                <div class="p4">
                    <p>{{$t('000012')}}</p>
                </div>
                <div class="p5">
                    <p>{{$t('000013')}}</p>
                </div>
            </div>
            <div class="mobile-home__check-buy" v-show="showCheckBuy">
                <div class="mask"></div>
                <div class="container">
                    <div class="panel">
                        <p class="title">{{$t('000020')}}</p>
                        <div class="tip-box" v-if="isChecking">
                            <p>{{$t('000021')}}</p>
                        </div>
                        <div class="check-status-box" v-if="isChecking">
                            <div class="bg-box">
                                <p class="seconds">{{secountCount}}</p>
                            </div>
                            <p class="wait-txt">{{$t('000023')}}</p>
                        </div>
                        <div class="no-update" ref="noUpdateTip" v-if="checkingFinished && !isVip">
                            <p class="wait-txt">{{$t('000024')}}</p>
                        </div>
                        <div class="btn-box" v-show="checkingFinished">
                            <div class="type-btn" ref="payOkBtn" @click="finish">{{$t('000025')}}</div>
                            <div class="type-btn repay" ref="rePayBtn" @click="toRepay">{{$t('000026')}}</div>
                        </div>
                    </div>
                    <div class="close-btn" @click="close">X</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
// import VConsole from 'vconsole';
import { getNativeData, getDeviceModel, openUrl, saveLog, } from '@lib/utils/embedded';
import getVipInfo from '@/api/airmore';
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
            deviceInfo: null,
            isLifeTime: null,
            prices: null,
            licenseInfo: null,
            currency: null,
            activeProductId: 0,
            WILL_EXPIRED_DAYS: {
                'trial': 3,
                'daily': 1,
                'monthly': 7,
                'quarterly': 10,
                'yearly': 15,
            },
            expire_date: null,
            model: null,
            products: {
                'en': [
                    {
                        'title': 'Android AirMore Yearly Subscription',
                        'currency': '$',
                        'price': '40.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '42',
                    },
                    {
                        'title': 'Android AirMore Quarterly Subscription',
                        'currency': '$',
                        'price': '18.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '1.98',
                    },
                    {
                        'title': 'Android AirMore Monthly Subscription',
                        'currency': '$',
                        'price': '6.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
                'cn': [
                    {
                        'title': '爱莫年度VIP',
                        'currency': '￥',
                        'price': '263',
                        'link': 'https://www.apowersoft.cn/order?product_id=18180281_Y',
                        'save': '37',
                    },
                    {
                        'title': '爱莫季度VIP',
                        'currency': '￥',
                        'price': '68',
                        'link': 'https://www.apowersoft.cn/order?product_id=18180280_Q',
                        'save': '7',
                    },
                    {
                        'title': '爱莫月度VIP',
                        'currency': '￥',
                        'price': '25',
                        'link': 'https://www.apowersoft.cn/order?product_id=18180279_M',
                    },
                ],
                'es': [
                    {
                        'title': 'VIP Anual',
                        'currency': '€',
                        'price': '40.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '42',
                    },
                    {
                        'title': 'VIP Trimestral',
                        'currency': '€',
                        'price': '18.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '1.98',
                    },
                    {
                        'title': 'VIP Mensual',
                        'currency': '€',
                        'price': '6.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
                'de': [
                    {
                        'title': 'Jährlicher VIP',
                        'currency': '€',
                        'price': '40.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '42',
                    },
                    {
                        'title': 'Vierteljährlicher VIP',
                        'currency': '€',
                        'price': '18.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '1.98',
                    },
                    {
                        'title': 'Monatlicher VIP',
                        'currency': '€',
                        'price': '6.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
                'fr': [
                    {
                        'title': 'Compte VIP Annuel',
                        'currency': '€',
                        'price': '40.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '42',
                    },
                    {
                        'title': 'Compte VIP Trimestriel',
                        'currency': '€',
                        'price': '18.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '1.98',
                    },
                    {
                        'title': 'Compte VIP Mensuel',
                        'currency': '€',
                        'price': '6.99',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
                'ja': [
                    {
                        'title': '年間VIP',
                        'currency': '¥',
                        'price': '¥4580',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '¥4780',
                    },
                    {
                        'title': '四半期VIP',
                        'currency': '¥',
                        'price': '¥1980',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '¥360',
                    },
                    {
                        'title': '月間VIP',
                        'currency': '¥',
                        'price': '¥780',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
                'tw': [
                    {
                        'title': '年度VIP',
                        'currency': 'NT$',
                        'price': '1260',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                        'save': '1740',
                    },
                    {
                        'title': '季度VIP',
                        'currency': 'NT$',
                        'price': '580',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658365&CART=1&CARD=2',
                        'save': '170',
                    },
                    {
                        'title': '月度VIP',
                        'currency': 'NT$',
                        'price': '250',
                        'link': 'https://shop.apowersoft.com/order/checkout.php?PRODS=21658367&CART=1&CARD=2',
                    },
                ],
            },
            showCheckBuy: false,
            interval: null,
            isChecking: false,
            checkingFinished: false,
            secountCount: null,
        };
    },

    created: function() {
        let saveData = getNativeData();

        saveLog(`获取保存信息成功：${JSON.stringify(saveData)}`);
        this.userInfo = saveData['userInfo'];

        // 获取设备信息
        this.deviceInfo = getDeviceModel();
        saveLog(`获取设备信息成功：${JSON.stringify(this.deviceInfo)}`);
        if (this.deviceInfo) {
            this.model = JSON.parse(this.deviceInfo).model;
        }

        // 获取价格信息
        this.prices = this.products[this.$i18n.locale] ? this.products[this.$i18n.locale] : this.products['en'];
        saveLog(`获取价格信息成功：${JSON.stringify(this.prices)}`);

        Cookies.set('identity_token', saveData.identity_token);

        this.queryVipInfo();
    },
    methods: {

        queryVipInfo: function() {
            // 获取vip信息
            getVipInfo()
                .then((res) => {
                    if (res && res.data) {
                        saveLog('获取vip信息成功');
                        saveLog(JSON.stringify(res.data));
                        this.isVip = res.data.is_vip;
                        this.expire_date = res.data.vip_expired_at;
                        if (this.isVip) {
                            this.showCheckBuy = false;
                            if (this.interval) {
                                window.clearInterval(this.interval);
                                this.interval = null;
                            }
                        }
                    }
                });
        },
        getPassportLicenseType: function(info) {
            return info.passport_license_type.replace('multi-', '');
        },

        setActive: function(id) {
            this.activeProductId = id;
        },

        gotoBuy: function() {
            const link = this.prices[this.activeProductId]['link'];
            openUrl(link);
            this.showCheckBuy = true;
            this.isChecking = true;
            this.secountCount = 60;
            this.checkingFinished = false;
            this.interval = setInterval(() => {
                this.secountCount = this.secountCount - 1;
                this.queryVipInfo();
                if (this.secountCount === 0) {
                    this.checkingFinished = true;
                    this.isChecking = false;
                    window.clearInterval(this.interval);
                }
            }, 1000);

        },

        finish: function() {
            this.queryVipInfo();
        },

        toRepay: function() {
            this.gotoBuy();
        },

        close: function() {
            window.clearInterval(this.interval);
            this.showCheckBuy = false;
        },
    },
};
</script>

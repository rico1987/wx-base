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
                    <p class="device-info" v-if="model && !isNearlyExpired">{{ model }}</p>
                    <p class="expire" v-if="isNearlyExpired">将于{{expire_date}}到期</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="mobile-home__prices" v-if="prices">
                <div class="price" v-bind:class="{ active: activeProductId === '8181810021' }"  @click="setActive('8181810021')">
                    <p class="p1">{{prices['8181810021']['title']}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810021']['price']}}</p>
                    <p class="p3">{{currency}}{{parseInt(prices['8181810021']['price'] / 12)}}/月</p>
                    <p class="p4">立省{{currency}}{{prices['8181810019']['price'] * 12 - prices['8181810021']['price']}}</p>
                    <p class="recommended">推荐</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === '8181810020' }" @click="setActive('8181810020')">
                    <p class="p1">{{prices['8181810020']['title']}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810020']['price']}}</p>
                    <p class="p3">{{currency}}{{parseInt(prices['8181810020']['price'] / 3)}}/月</p>
                    <p class="p4">立省{{currency}}{{prices['8181810019']['price'] * 3 - prices['8181810020']['price']}}</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === '8181810019' }" @click="setActive('8181810019')">
                    <p class="p1">{{prices['8181810019']['title']}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810019']['price']}}</p>
                    <p class="p3">{{currency}}{{prices['8181810019']['price']}}/月</p>
                    <p class="p4">无优惠</p>
                </div>
            </div>
            <div class="mobile-home__buy-btn">
                <span class="btn" @click="gotoBuy()">立即开通</span>
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
import Cookies from 'js-cookie';
import { getNativeData, getDeviceModel, getIosProductPrice, buyProduct, } from '@lib/utils/embedded';
import { getVipInfo, } from '@/api/support';
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
            prices: null,
            licenseInfo: null,
            currency: null,
            activeProductId: '8181810021',
            WILL_EXPIRED_DAYS: {
                'trial': 3,
                'daily': 1,
                'monthly': 7,
                'quarterly': 10,
                'yearly': 15,
            },
            isNearlyExpired: false,
            expire_date: null,
            model: null,
        };
    },

    created: function() {
        window.setIosProductPrice = this.setPrices;

        let saveData = getNativeData();
        this.userInfo = saveData['userInfo'];

        Cookies.set('identity_token', saveData.identity_token);

        // 获取vip信息
        getVipInfo(this.$i18n.locale)
            .then((res) => {
                if (res && res.data && res.data.data && res.data.data.license_info) {
                    this.licenseInfo = res.data.data.license_info;
                    this.isVip = this.licenseInfo.is_activated === 1;
                    let remainingDays = this.licenseInfo.remain_days;
                    let licenseType;
                    licenseType = this.licenseInfo.passport_license_type.replace('multi-', '');
                    if (remainingDays > 0 && remainingDays <= this.WILL_EXPIRED_DAYS[licenseType]) {
                        this.isNearlyExpired = true;
                        this.expire_date = this.licenseInfo.expire_date.split(' ')[0];
                    } else {
                        this.isNearlyExpired = false;
                    }
                }
            });

        // 获取设备信息
        this.deviceInfo = getDeviceModel();
        if (this.deviceInfo) {
            this.model = JSON.parse(this.deviceInfo).model;
        }

         // 获取价格信息
        getIosProductPrice(['8181810021', '8181810020', '8181810019', ]);
       
    },
    methods: {
        
        setPrices: function(prices) {
            this.prices = JSON.parse(prices);
            // 获取货币单位
            this.currency = this.prices['8181810021']['price'].replace(/[0-9.]/g, '');
            for (let i = 0; i < Object.keys(this.prices).length; i = i + 1) {
                this.prices[Object.keys(this.prices)[i]].price = this.prices[Object.keys(this.prices)[i]].price.replace(this.currency, '');
            }
        },

        setActive: function(id) {
            this.activeProductId = id;
        },

        gotoBuy: function() {
            buyProduct(this.activeProductId);
        },
    },
};
</script>

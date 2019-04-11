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
                <div class="price" v-bind:class="{ active: activeProductId === '8181810021' }"  @click="setActive('8181810021')">
                    <p class="p1">{{$t('000016')}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810021']['price']}}</p>
                    <p class="p3">{{currency}}{{parseInt(prices['8181810021']['price'] / 12)}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000003')}}{{currency}}{{prices['8181810019']['price'] * 12 - prices['8181810021']['price']}}</p>
                    <p class="recommended">{{$t('000004')}}</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === '8181810020' }" @click="setActive('8181810020')">
                    <p class="p1">{{$t('000017')}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810020']['price']}}</p>
                    <p class="p3">{{currency}}{{parseInt(prices['8181810020']['price'] / 3)}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000003')}}{{currency}}{{prices['8181810019']['price'] * 3 - prices['8181810020']['price']}}</p>
                </div>
                <div class="price" v-bind:class="{ active: activeProductId === '8181810019' }" @click="setActive('8181810019')">
                    <p class="p1">{{$t('000018')}}</p>
                    <p class="p2"><span>{{currency}}</span>{{prices['8181810019']['price']}}</p>
                    <p class="p3">{{currency}}{{prices['8181810019']['price']}}/{{$t('000002')}}</p>
                    <p class="p4">{{$t('000005')}}</p>
                </div>
            </div>
            <div class="mobile-home__buy-btn">
                <span class="btn" @click="gotoBuy()">{{$t('000006')}}</span>
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
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
// import VConsole from 'vconsole';
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
            isLifeTime: null,
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
                    // const vConsole = new VConsole();
                    this.licenseInfo = res.data.data.license_info;
                    this.isVip = this.licenseInfo.is_activated === '1';
                    this.isLifeTime === this.getPassportLicenseType(this.licenseInfo) === 'lifetime';
                    this.expire_date = this.licenseInfo.expire_date.split(' ')[0];
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

        getPassportLicenseType: function(info) {
            return info.passport_license_type.replace('multi-', '');
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

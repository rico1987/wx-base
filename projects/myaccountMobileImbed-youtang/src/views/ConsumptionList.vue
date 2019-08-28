<template>
    <div class="myaccount-consumption-list has-header">
        <MobileHeader
            defaultLeft
            :title="$t('001854')"
        >
        </MobileHeader>
        <div class="container">
            <div class="tab-header">
                <div :class="{ 'active':  active_tab == 'purchase_records'}" >
                    <span>
                        <span class="text" @click="setActiveTab('purchase_records')">{{ $t('001855') }}</span>
                        <span class="bottom-border"></span>
                    </span>
                </div>
                <div :class="{ 'active':  active_tab == 'consumption_records'}" >
                    <span>
                        <span class="text" @click="setActiveTab('consumption_records')">{{ $t('001856') }}</span>
                        <span class="bottom-border"></span>
                    </span>
                </div>
            </div>
            <div class="tab-content" @scroll="onscroll()">
                <div class="order-list" v-if="active_tab == 'purchase_records'">
                    <div class="list-container" v-if="orderList && orderList.length > 0">
                        <div
                            class="order"
                            v-bind:key="order.transaction_id"
                            v-for="order in orderList"
                            :class="{
                                'less-candy': order['mv_coin_num'] < 50,
                                'more-candy': order['mv_coin_num'] < 100 && order['mv_coin_num'] > 49,
                                'most-candy': order['mv_coin_num'] > 99
                            }"
                        >
                            <div class="left">
                                <p>{{paymethod(order['payment_method'])}}</p>
                                <p>{{order['transaction_id']}}</p>
                                <p>{{order['transaction_time'] | cutOff}}</p>
                            </div>
                            <div class="right">
                                <span>{{order['invoice_amount'] | integer}}</span>
                            </div>
                        </div>
                    </div>
                    <p class="no-data" v-if="!orderList || orderList.length === 0">{{ $t('001864') }}</p>
                </div>
                <div class="consumption-list" v-if="active_tab == 'consumption_records'">
                    <div class="list-container" v-if="consumptionList && consumptionList.length > 0">
                        <div class="consumption" v-bind:key="consumption.id" v-for="consumption in consumptionList">
                            <div class="left">
                                <p>{{getDetail(consumption)}}</p>
                                <p>{{consumption['created_at'] | cutOff}}</p>
                            </div>
                            <div class="right">
                                <span>
                                    <span>{{consumption['consume_num']}}</span>{{ $t('001863') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p class="no-data" v-if="!consumptionList || consumptionList.length === 0">{{ $t('001864') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import { getNativeData, saveNativeData, } from '@lib/utils/embedded';
import { login, getConsumptionList, getOrderList, } from '@/api/lightmv';

export default {
    name: 'consumptionLIst',
    components: {
        MobileHeader,
    },
    data() {
        return {
            active_tab: 'purchase_records',
            loading: false,
            orderList: null,
            consumptionList: null,
            per_page: 5,
            consumptionPage: 1,
            hasMoreConsumption: false,
            orderPage: 1,
            hasMoreOrder: false,
        };
    },

    created: function() {
        const saveData = getNativeData();
        const lightmvApiToken = saveData['lightmv_api_token'];
        if (!lightmvApiToken) {
            const identity_token = saveData['identity_token'];
            login(identity_token)
                .then((res) => {
                    if (res.data.status === '1') {
                        const lightmvUserInfo = res.data.data.user;
                        saveData['lightmv_api_token'] = lightmvUserInfo['api_token'];
                        saveNativeData(saveData);
                        this.getOrderList();
                        this.getConsumptionList();
                    }
                });
        } else {
            this.getOrderList();
            this.getConsumptionList();
        }
    },

    methods: {

        onscroll: function() {
            if (event.target.scrollTop + event.target.offsetHeight > event.target.scrollHeight - 20) {
                if (this.active_tab === 'purchase_records') {
                    if (!this.hasMoreOrder) {
                        return;
                    }
                    this.orderPage += 1;
                    getOrderList(this.orderPage, this.per_page, this.$i18n.locale)
                        .then((res) => {
                            if (res.data.status === '1') {
                                this.orderList = this.orderList.concat(res.data.data.orders);
                                this.hasMoreOrder = res.data.data.total_count > this.orderList.length;
                            }
                        });
                } else if (this.active_tab === 'consumption_records') {
                    if (!this.hasMoreConsumption) {
                        return;
                    }
                    this.consumptionPage += 1;
                    getConsumptionList(this.consumptionPage, this.per_page, this.$i18n.locale)
                        .then((res) => {
                            if (res.data.status === '1') {
                                this.consumptionList = this.consumptionList.concat(res.data.data.coin_consumes);
                                this.hasMoreConsumption = res.data.data.total_count > this.consumptionList.length;
                            }
                        });
                }
            }
        },

        setActiveTab: function(tab) {
            this.active_tab = tab;
        },

        getOrderList: function() {
            getOrderList(this.orderPage, this.per_page, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === '1') {
                        this.orderList = res.data.data.orders;
                        this.hasMoreOrder = res.data.data.total_count > this.orderList.length;
                    }
                });
        },

        getConsumptionList: function() {
            getConsumptionList(this.consumptionPage, this.per_page, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === '1') {
                        this.consumptionList = res.data.data.coin_consumes;
                        this.hasMoreConsumption = res.data.data.total_count > this.consumptionList.length;
                    }
                });
        },

        getDetail(consumption) {
            if (consumption.type === 'video_limit_num') {
                return this.$t('001859', {count: consumption['memo'], });
            } else if (consumption.type === 'priority_make_num') {
                return this.$t('001858', {count: consumption['memo'], });
            } else if (consumption.type === 'task_limit_num') {
                return this.$t('001860', {count: consumption['memo'], });
            } else if (consumption.type === 'video_download') {
                return `${this.$t('001862')}: ${consumption['memo']}`;
            }
        },

        paymethod(value) {
            if (value === 'wxpay' && this.$i18n.locale === 'zh') {
                return '微信';
            } else if (value === 'alipay' && this.$i18n.locale === 'zh') {
                return '支付宝';
            } else {
                return value;
            }
        },
    },

    filters: {
        integer: function(value) {
            return value.substring(0, value.lastIndexOf('.'));
        },

        cutOff: function(value) {
            return value.split(' ')[0];
        },
    },
};
</script>

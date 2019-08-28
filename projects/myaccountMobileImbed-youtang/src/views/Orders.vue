<template>
    <div class="myaccount-orders has-header has-loading">
        <MobileHeader
            defaultLeft
            :title='$t("001264")'
        >
        </MobileHeader>
        <div class="myaccount-orders__order-list" v-if="!loading">
            <div class="myaccount-orders__order" v-for="order in orders" v-bind:key="order.transaction_id">
                <p class="myaccount-orders__order-number"><span>{{ $t('001275') }}: {{order.transaction_id}}</span></p>
                <p class="myaccount-orders__order-time">{{ $t('001276') }}: {{order.transaction_time}}</p>
                <img class="myaccount-orders__order-icon" :src="order.product_icon" />
                <p class="myaccount-orders__order-edition">{{order.localize_name}}</p>
                <p class="myaccount-orders__order-activation-code">{{ $t('001190') }}: <span>{{order.license_code}}</span></p>
                <p class="myaccount-orders__order-expire">{{ $t('001790') }}: <span>{{ getLicenseType(order) }}</span></p>
                <div class="myaccount-orders__order-link">
                    <span @click="openBuyLink(order)" class="renew" target="_blank" v-if="order.expire_date !== 'lifetime'">{{ $t('001185') }}</span>
                </div>
                <div class="myaccount-orders__links">
                    <span @click="openLink(order.faq_url)" target="_blank" class="faq">{{ $t('001186') }}</span>
                    <span @click="openLink(order.forum_url)" target="_blank" class="forum">{{ $t('001187') }}</span>
                </div>
            </div>
        </div>
        <div class="myaccount-orders__no-data" v-if="!loading && (!orders || orders.length === 0)">
            <p>{{ $t('001279') }}, <span @click="openLink(storeLink)">{{ $t('001280') }}</span></p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import { getNativeData, openUrl, } from '@lib/utils/embedded';
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';

import { getOrders, } from '@/api/support';

export default {
    name: 'orders',
    components: {
        Icon,
        MobileHeader,
    },
    data() {
        return {
            orders: [],
            page: 1,
            size: 10,
            loading: false,
            storeLink: null,
        };
    },

    created: function() {
        this.getAccountOrders();
        if (this.$i18n.locale === 'zh') {
            this.storeLink = 'https://www.apowersoft.cn/store';
        } else {
            this.storeLink = 'https://www.apowersoft.com/store';
        }
    },

    methods: {

        isApp() {
        },

        getAccountOrders() {
            this.loading = true;
            getOrders(this.page, this.size, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.orders = res.data.data.orders;
                        this.setDefaultProductIcon();
                    } else {
                        this.$toast.show({
                            text: this.$t('001793'),
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    if (error === 'timeout of 5000ms exceeded') {
                        this.$toast.show({
                            text: this.$t('001794'),
                        });
                    } else {
                        this.$toast.show({
                            text: this.$t('001793'),
                        });
                    }
                    this.loading = false;
                });
        },

        setDefaultProductIcon() {
            let item;
            for (let i = 0; i < this.orders.length; i += 1) {
                item = this.orders[i];
                if (!item.product_icon) {
                    item['product_icon'] = 'https://myaccount.aoscdn.com/cdn/img/orders/default-logo.svg?bcf4';
                }
            }
        },

        getLicenseType(order) {
            if (order.expire_date === 'lifetime') {
                return this.$t('001247');
            } else {
                return order.expire_date;
            }
        },

        openBuyLink(order) {
            let saveData = getNativeData();
            let url = `${order.buy_url}?identity_token=${saveData['identity_token']}`;
            openUrl(url);
        },

        openLink(url) {
            openUrl(url);
        },
    },
};
</script>

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
                    <a :href="getBuyLink(order)" class="renew" target="_blank" v-if="order.expire_date !== 'lifetime'">{{ $t('001185') }}</a>
                    <a href="" v-if="isApp(order)">{{ $t('001791') }}</a>
                    <span v-if="showInvoiceLink && order.invoice_apply === '0'" @click="gotoInvoice(order)">申请发票</span>
                </div>
                <div class="myaccount-orders__links">
                    <a :href="order.faq_url" target="_blank" class="faq">{{ $t('001186') }}</a>
                    <a :href="order.forum_url" target="_blank" class="forum">{{ $t('001187') }}</a>
                </div>
            </div>
        </div>
        <div class="myaccount-orders__no-data" v-if="!loading && (!orders || orders.length === 0)">
            <p>{{ $t('001279') }}, <a :href="storeLink">{{ $t('001280') }}</a></p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';
import Cookies from 'js-cookie';

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
            showInvoiceLink: false,
        };
    },

    created: function() {
        this.getAccountOrders();
        if (this.$i18n.locale === 'zh') {
            this.storeLink = 'https://www.apowersoft.cn/store';
        } else {
            this.storeLink = 'https://www.apowersoft.com/store';
        }
        this.showInvoiceLink = this.$i18n.locale === 'zh';
    },

    methods: {

        isApp() {
        },

        gotoInvoice(order) {
            this.$router.push({
                path: '/submit-invoice',
                query: {
                    orderId: order['id'],
                },
            });
        },

        getAccountOrders() {
            this.loading = true;
            getOrders(this.page, this.size, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.orders = res.data.data.orders;
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
        getLicenseType(order) {
            if (order.expire_date === 'lifetime') {
                return this.$t('001247');
            } else {
                return order.expire_date;
            }
        },

        getBuyLink(order) {
            return `${order.buy_url}?identity_token=${Cookies.get('identity_token')}`;
        },
    },
};
</script>

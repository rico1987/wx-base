<template>
    <div class="myaccount-orders has-header has-loading">
        <MobileHeader
            defaultLeft
            title="My Order"
        >
        </MobileHeader>
        <div class="myaccount-orders__order-list" v-if="!loading">
            <div class="myaccount-orders__order" v-for="order in orders" v-bind:key="order.transaction_id">
                <p class="myaccount-orders__order-number"><span>Order Number: {{order.transaction_id}}</span></p>
                <p class="myaccount-orders__order-time">Purchase time: {{order.transaction_time}}</p>
                <img class="myaccount-orders__order-icon" :src="order.product_icon" />
                <p class="myaccount-orders__order-edition">{{order.localize_name}}</p>
                <p class="myaccount-orders__order-activation-code">Activation code: <span>{{order.license_code}}</span></p>
                <p class="myaccount-orders__order-expire">Term of validity: <span>{{order.license_code}}</span></p>
                <div class="myaccount-orders__order-link">
                    <a href="" class="renew">Renew</a>
                    <a href="" v-if="isApp(order)">Download now</a>
                </div>
                <div class="myaccount-orders__links">
                    <a :href="order.faq_url" target="_blank" class="faq">FAQ</a>
                    <a :href="order.forum_url" target="_blank" class="forum">Forum</a>
                </div>
            </div>
        </div>
        <div class="myaccount-orders__no-data" v-if="!loading && orders.length === 0">
            <p>No orders, <a href="#">Order now</a></p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
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
        };
    },

    created: function() {
        this.getAccountOrders();
    },

    methods: {

        isApp() {
        },

        getAccountOrders() {
            this.loading = true;
            getOrders(this.page, this.size)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.orders = res.data.data.orders;
                    } else {
                        this.$toast.show({
                            text: '获取订单失败!',
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    if (error === 'timeout of 5000ms exceeded') {
                        this.$toast.show({
                            text: '获取订单超时，请刷新再试!',
                        });
                    } else {
                        this.$toast.show({
                            text: '获取订单失败!',
                        });
                    }
                    this.loading = false;
                });
        },
    },
};
</script>

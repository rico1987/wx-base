<template>
    <div class="myaccount-buy-token has-header">
        <MobileHeader
            defaultLeft
            :title="$t('001872')"
        >
        </MobileHeader>
        <div class="container">
            <div class="vip-info">
                <p>我的糖币</p>
                <p class="count" v-if="lightmvVipInfo">{{lightmvVipInfo['mv_coin']}}</p>
            </div>
            <ul class="product-list">
                <li
                    class="product"
                    v-bind:key="product.product_id"
                    v-for="product in products"
                    :class="{ 'active':  active_product === product.product_id }"
                    @click="setActiveProduct(product.product_id)"
                >
                    <p class="count">
                        {{product.mv_coin_num}}
                    </p>
                    <p class="token">糖币</p>
                    <p class="gift" v-if="product.gift_num">赠送{{product.gift_num}}糖币</p>
                    <p class="price">{{product.price | int}}</p>
                </li>
            </ul>
            <a :href="getBuyLink()" target="_blank" class="buy-btn">点击购买</a>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { getLightmvProducts, } from '@/api/lightmv';
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'buyToken',
    components: {
        MobileHeader,
    },
    data() {
        return {
            products: null,
            active_product: null,
            lightmvVipInfo: null,
            lang: null,
        };
    },

    created: function() {
        this.lang = this.$i18n.locale;
        try {
            this.lightmvVipInfo = JSON.parse(Cookies.get('lightmvVipInfo'));
        } catch (e) {
            this.lightmvVipInfo = null;
        }
        this.getProducts();
    },
    methods: {

        setActiveProduct: function(product_id) {
            this.active_product = product_id;
        },

        getBuyLink: function() {
            if (this.products) {
                const identity_token = Cookies.get('identity_token');
                const product = this.products.find(ele => ele['product_id'] === this.active_product);
                console.log(product);
                return `${product['buy_url']}&identity_token=${identity_token}`;
            } else {
                return null;
            }
        },

        getProducts: function() {
            getLightmvProducts(this.lang)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === '1') {
                        this.products = res.data.data.coin_product;
                        console.log(this.products);
                        this.active_product = this.products[1]['product_id'];
                    }
                });
        },
    },

    filters: {
        int: function(value) {
            console.log(value);
            return value && value.substring(0, value.lastIndexOf('.'));
        },
    },
};
</script>

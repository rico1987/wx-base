<template>
    <div class="myaccount-invoice has-header has-loading">
        <MobileHeader
            defaultLeft
            title='我的发票'
        >
        </MobileHeader>
        <div class="myaccount-orders__invoice-list" v-if="!loading">
            <div class="invoice" v-for="invoice in invoiceList" v-bind:key="invoice.order_id">
                <div class="row">
                    <span>订单号：</span>
                    <span>{{invoice['transaction_id']}}</span>
                </div>
                <div class="row">
                    <span>产品：</span>
                    <span>{{invoice['localize_name']}}</span>
                </div>
                <div class="row">
                    <span>状态：</span>
                    <span>{{invoice['status'] | status}}</span>
                    <span class="link" v-if="invoice['status'] === '2'" @click="checkDetail(invoice)">查看详情</span>
                </div>
            </div>
        </div>
        <div class="myaccount-orders__no-data" v-if="!loading && (!invoiceList || invoiceList.length === 0)">
            <p>暂无发票消息 <span @click="goto('orders')">立即开发票</span></p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';

import { getInvoices, } from '@/api/support';

export default {
    name: 'invoice',
    components: {
        Icon,
        MobileHeader,
    },
    data() {
        return {
            invoiceList: [],
            page: 1,
            size: 10,
            total: null,
            loading: false,
        };
    },

    created: function() {
        this.getInvoiceList();
    },

    methods: {

        goto(path) {
            this.$router.push({ path, });
        },

        checkDetail(invoice) {
            let status;
            if (invoice['status'] === 2 || invoice['status'] === 3) {
                status = '2';
            } else {
                status = '1';
            }
            this.$router.push({
                path: '/submit-invoice',
                query: {
                    orderId: invoice['order_id'],
                    status: status,
                },
            });
        },

        getInvoiceList() {
            this.loading = true;
            getInvoices(this.page, this.size, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === 1) {
                        if (res.data.data.invoice_list) {
                            this.invoiceList = res.data.data.invoice_list;
                            this.total = res.data.data.total_count;
                        }
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
    },

    filters: {
        status: function(value) {
            return {
                '-1': '开票失败',
                '1': '开票中',
                '2': '已开票',
                '3': '已冲红',
            }[value];
        },
    },
};
</script>

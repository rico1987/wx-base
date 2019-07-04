<template>
    <div class="myaccount-submit-ticket has-header has-loading">
        <MobileHeader
            defaultLeft
            title="申请发票"
        >
        </MobileHeader>
        <div class="container">
            <div class="invoice-info" v-if="invoiceInfo">
                <p><span>订单号：</span>{{invoiceInfo['transaction_id']}}</p>
                <p><span>实付金额：</span>{{invoiceInfo['invoice_amount']}}</p>
            </div>
            <div class="form-group">
                <label>发票类型：</label>
                <div class="input-container">
                    <input type="checkbox" id="invoiceType" :disabled="!editable" v-model="invoice_type">
                    <label for="invoiceType">电子增值税普通发票</label>
                </div>
            </div>
            <div class="form-group">
                <label>发票抬头类型：</label>
                <div class="input-container">
                    <input type="radio" id="p" value="1" :disabled="!editable" v-model="invoice_title_type">
                    <label for="p">个人</label>
                    <input type="radio" id="e" value="2" :disabled="!editable" v-model="invoice_title_type">
                    <label for="e">企业</label>
                </div>
            </div>
            <div class="form-group">
                <label><span class="required">*</span>发票抬头：</label>
                <div class="input-container">
                    <input type="text" maxlength="100" :disabled="!editable" v-model="invoice_title" />
                </div>
                <p class="tip">发票项目：商家默认将以订单明细开具发票，如需要开具其他项目，请与商家沟通协调。</p>
            </div>
            <div class="form-group" v-if="invoice_title_type === '2'">
                <label><span class="required">*</span>企业税号：</label>
                <div class="input-container">
                    <input type="text" max="100" :disabled="!editable" v-model="buyer_tax_no" />
                </div>
                <p class="tip">重要提示：提供给纳税人识别号或统一社会信用代码，否则该发票无法作为税收凭证</p>
            </div>
            <div class="form-group">
                <label><span class="required">*</span>接受发票邮箱：</label>
                <div class="input-container">
                    <input type="text" maxlength="50" :disabled="!editable" v-model="receive_email" />
                </div>
                <p class="tip">提示：发票开好后会自动发送至此邮箱</p>
            </div>
            <div class="form-group" style="border-bottom: none;">
                <button @click="submit()" v-if="status === '3'">提交申请</button>
                <button @click="submit()" v-if="status === '1'">提交申请</button>
                <a :href="link" v-if="status === '2'">下载查看</a>
            </div>
        </div>

        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import MobileInput from '@/components/MobileInput.vue';
import Icon from '@/components/Icon.vue';
import { getInvoiceInfo, submitInvoiceData, } from '@/api/support';
import { getQueryValue, } from '../../../../lib/utils/index';

export default {
    name: 'submitInvoice',
    components: {
        MobileHeader,
        MobileInput,
        Icon,
    },

    created: function() {
        this.orderId = getQueryValue('orderId');
        this.getInvoiceInfo(this.orderId);
        this.status = getQueryValue('status') || '3';
        this.editable = this.status !== '2';
    },

    data() {
        return {
            invoice_type: true,
            invoice_title_type: 1,
            invoice_title: null,
            buyer_tax_no: null,
            receive_email: null,
            loading: false,
            invoiceInfo: null,
            orderId: null,
            status: '1', // 1: 'edit', 2: 'view', 3: 'new'
            editable: true,
            link: null,
        };
    },

    methods: {

        check() {

        },

        getInvoiceInfo(orderId) {
            this.loading = true;
            getInvoiceInfo(orderId)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.invoiceInfo = res.data.data.invoice_info;
                        this.invoice_type = this.invoiceInfo['invoice_type'];
                        this.invoice_title_type = this.invoiceInfo['invoice_title_type'];
                        this.invoice_title = this.invoiceInfo['invoice_title'];
                        this.buyer_tax_no = this.invoiceInfo['buyer_tax_no'];
                        this.receive_email = this.invoiceInfo['receive_email'];
                        if (this.invoiceInfo['status'] === '2' || this.invoiceInfo['status'] === '3') {
                            this.editable = false;
                            this.status = '2';
                        }
                        this.link = this.invoiceInfo['invoice_pdf_url'];
                    } else {
                        this.$toast.show({
                            text: '获取订单信息失败',
                        });
                    }
                    this.loading = false;
                });
        },

        submit() {
            let postData;
            if (this.invoice_title_type === '1') {
                if (!this.invoice_title || !this.buyer_tax_no || !this.receive_email) {
                    this.$toast.show({
                        text: '请输入所有必填项',
                    });
                    return false;
                }
            } else if (this.invoice_title_type === '2') {
                if (!this.invoice_title || !this.receive_email) {
                    this.$toast.show({
                        text: '请输入所有必填项',
                    });
                    return false;
                }
            }
            postData = {
                order_id: this.orderId,
                invoice_type: this.invoice_type ? '1' : '0',
                invoice_title_type: this.invoice_title_type,
                invoice_title: this.invoice_title,
                receive_email: this.receive_email,
                action: 'update-invoice-info',
                language: this.$i18n.locale,
            };
            if (this.invoice_title_type === '1') {
                postData['buyer_tax_no'] = this.buyer_tax_no;
            }
            submitInvoiceData(postData)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.$toast.show({
                            text: '申请成功',
                        });
                    } else {
                        this.$toast.show({
                            text: '申请失败',
                        });
                    }
                });
        },
    },
};
</script>

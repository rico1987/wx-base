<template>
    <div class="account-qr-code">
        <Switcher></Switcher>
        <div class="account-qr-code__container">
            <h2>微信扫码，关注公众号登录</h2>
            <div class="account-qr-code__qr-code" class.is-loading="loading">
                <img :src="qrcodeUrl" />
            </div>
        </div>
    </div>
</template>

<script>
import Switcher from '@/components/Switcher.vue';
import { getQrCode, } from '@/api/account';

export default {
    name: 'qrCode',
    components: {
        Switcher,
    },
    data() {
        return {
            loading: false,
            qrcodeUrl: null,
            loadingErr: null,
        };
    },

    created: function() {
        this.getQrcode();
    },
    methods: {
        getQrcode: function() {
            getQrCode(this.$i18n.locale)
                .then((res) => {
                    if (res.data)
                });
        },
    },
};
</script>

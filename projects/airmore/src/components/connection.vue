<template>
    <div class="airmore-connection">
        <div class="airmore-connection__tabs">
            <div class="airmore-connection__tab">QR Code</div>
            <div class="airmore-connection__tab">Raddar</div>
        </div>
        <div class="airmore-connection__tab-panes">
            <div class="airmore-connection__tab-pane" v-loading="isLoadingQrCode">
                <img src="" alt="">
                <p>Scan QR code using Airmore</p>
            </div>
            <div class="airmore-connection__tab-pane"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AirmoreConnection',

    componentName: 'AirmoreConnection',

    props: {
    },

    data() {
        return {
            connected: false,
            isLoadingQrCode: false,
        }
    },

    methods: {
        connect() {
        },

        getConnectionState() {
            return this.connected;
        }
    },

};
</script>

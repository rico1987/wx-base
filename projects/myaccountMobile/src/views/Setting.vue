<template>
    <div class="myaccount-setting">
<MobileHeader
            defaultLeft
            title="Setting"
        >
        </MobileHeader>
        <div class="container">
            <div class="row">
                <div class="left">Apowersoft will send you internal real-time communications
                    from time to time after subscription</div>
                <div class="right"></div>
            </div>
            <div class="row">
                <div class="left">Apowersoft will send you internal real-time communications
                    from time to time after subscription</div>
                <div class="right"></div>
            </div>
            <div class="row">
                <div class="left">Apowersoft will send you internal real-time communications
                    from time to time after subscription</div>
                <div class="right"></div>
            </div>
            <div>
                <span class="btn btn-primary" @click="gotoRegistration()">Exit</span>
            </div>
        </div>    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'setting',
    components: {
        MobileHeader,
    },
    data() {
        return {
        };
    },
};
</script>

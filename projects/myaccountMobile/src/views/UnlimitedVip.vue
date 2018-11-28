<template>
    <div class="myaccount-unlimited-vip has-header">
        <MobileHeader
            defaultLeft
            title="Unlimited Vip"
        >
        </MobileHeader>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'orders',
    components: {
        MobileHeader,
    },
    data() {
        return {
            orders: [],
        };
    },

    methods: {
    },
};
</script>

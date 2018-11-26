<template>
    <div class="myaccount-orders">
        <MobileHeader
            defaultLeft
            title="My Order"
        >
        </MobileHeader>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';

import { getOrders, } from '@/api/support';

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

    created: function() {
        this.getAccountOrders();
    },

    methods: {
        getAccountOrders() {
            getOrders()
                .then(res => {
                    console.log(res);
                    debugger;
                })
                .catch((error) => {
                    console.log(error);
                    debugger;
                });
        },
    },
};
</script>

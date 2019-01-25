<template>
    <div class="home-container">
        <Connection></Connection>
    </div>
</template>

<script>
import Connection from '@/components/Connection.vue';

export default {
    name: 'home',
    components: {
        Connection,
    },
    data() {
        return {
            isConnected: false,
        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

<template>
    <div class="myaccount-work-list">
        <MobileHeader
            defaultLeft
            title="My work list"
        >
        </MobileHeader>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'myWorkList',
    components: {
        MobileHeader,
    },
    data() {
        return {
        };
    },
};
</script>

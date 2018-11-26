<template>
    <div class="myaccount-info">
        <MobileHeader
            defaultLeft
            title="Personal information"
        >
        </MobileHeader>
        <div class="avatar-container">
            <img v-if="avatarUrl" :src="avatarUrl" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'info',
    components: {
        MobileHeader,
    },
    data() {
        return {
            avatarUrl: null,
        };
    },

    created: function() {
        this.getAvatarUrl();
    },
    methods: {
        getAvatarUrl() {

        },
    },
};
</script>

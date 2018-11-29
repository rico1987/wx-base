<template>
    <div class="myaccount-submit-ticket has-header has-loading">
        <MobileHeader
            defaultLeft
            title="My worklist"
        >
        </MobileHeader>
        <div class="container">
            <textarea rows="3" cols="20">
            </textarea>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';

export default {
    name: 'submitTicket',
    components: {
        Icon,
        MobileHeader,
    },
    data() {
        return {
            loading: false,
        };
    },

    methods: {
    },
};
</script>

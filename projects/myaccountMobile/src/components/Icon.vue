<template>
    <i :class="className"></i>
</template>

<script>
export default {
    name: 'MobileIcon',

    componentName: 'MobileIcon',

    props: {
        type: String,
        size: String,
    },

    computed: {
        className () {
            return `mobile-icon mobile-icon--${this.type.replace(/_/g, '-')} mobile-icon--${this.size ? this.size : 'normal'}`;
        }
    }
};
</script>

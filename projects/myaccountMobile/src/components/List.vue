<template>
    <div class="mobile-list">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MobileList',

    componentName: 'MobileList',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },

    provide() {
        return {
            mobileList: this,
        };
    },
}
</script>

<template>
    <div class="mobile-list-item" :style="{height}">
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
            default: '60px',
        },
    },

    inject: ['mobileList'],

    provide() {
        return {
            mobileListItem: this,
        };
    },

    computed: {
        height() {
            return this.itemHeight || this.mobileList.itemHeight;
        },
    },

    methods: {

    },
}
</script>

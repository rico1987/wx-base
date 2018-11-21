<template>
    <header class="mobile-header" :style="{ height }">
        <div class="mobile-header__left" v-if="$slots.left">
            <slot name="left"></slot>
        </div>
        <div class="mobile-header__center">
            <slot></slot>
        </div>
        <div class="mobile-header__right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
export default {
    name: 'MobileHeader',

    componentName: 'MobileHeader',

    props: {
        height: {
            type: String,
            default: '60pt',
        },
    },

    methods: {

    },
};
</script>

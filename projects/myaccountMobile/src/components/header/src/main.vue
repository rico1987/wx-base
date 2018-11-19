<template>
    <div class="wx-mobile-header" :style="{ height }">
        <div class="wx-mobile-header__left" v-if="$slots.left">
            <slot name="left">
                <span class="wx-mobile-header__left-icon"></span>
            </slot>
        </div>
        <div class="wx-mobile-header__center">
        </div>
        <div class="wx-mobile-header__right"  v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WxMobileFooter',

    componentName: 'WxMobileFooter',

    props: {
        height: {
            type: String,
            default: '40px',
        },
    },

};
</script>

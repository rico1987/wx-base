<template>
    <div class="account-window-header">
        <div class="account-window-header__left" v-if="$slots.left">
            <slot name="left"></slot>
        </div>
        <div class="account-window-header__center" v-if="$slots.center">
            <slot name="center"></slot>
        </div>
        <div class="account-window-header__right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WinderHeader',

    componentName: 'WinderHeader',

    props: {
    },
};
</script>

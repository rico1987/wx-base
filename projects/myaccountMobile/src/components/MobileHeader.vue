<template>
    <header class="mobile-header" :style="{ height }">
        <div class="mobile-header__left" v-if="$slots.left && !defaultLeft">
            <slot name="left"></slot>
        </div>
        <div class="mobile-header__left is-default" v-if="defaultLeft" @click="back()">
            <Icon type="angle-left" />
        </div>
        <div class="mobile-header__center">
            <slot v-if="$slots.center"></slot>
            <h1 v-if="title && !$slots.center">{{title}}</h1>
        </div>
        <div class="mobile-header__right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    name: 'MobileHeader',

    componentName: 'MobileHeader',

    components: {
        Icon,
    },

    props: {
        height: {
            type: String,
            default: '51px',
        },
        defaultLeft: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },

    methods: {
        back() {
            this.$router.back(-1);
        },
    },
};
</script>

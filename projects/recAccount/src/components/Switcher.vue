<template>
    <div class="account-switcher" @click="switchLoginMethod()">
        <div class="account-switcher__icon" v-bind:class="switcherIconClass">
        </div>
        <div class="account-switcher__bubble">{{ bubbleText }}</div>
    </div>
</template>

<script>
export default {
    name: 'Switcher',

    componentName: 'Switcher',

    props: {
    },

    computed: {
        switcherIconClass: function() {
            if (this.$route.path === '/qrcode') {
                return 'is-qrcode';
            }
            return '';
        },
        bubbleText: function() {
            if (this.$route.path === '/qrcode') {
                return '使用其他方式登录';
            }
            return '微信扫码登录';
        },
    },

    methods: {
        switchLoginMethod: function() {
        },
    },
};
</script>

<template>
    <div class="mobile-switch">
        <div class="mobile-switch__slider"></div>
        <div class="mobile-switch__ball"
            :class="{ 'is-on': currentValue }"
            @click="switchValue()"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'MobileSwitch',

    componentName: 'MobileSwitch',

    model: {
        prop: 'currentValue',
        event: 'on-change',
    },

    props: {
        defaultValue: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            currentValue: false,
        };
    },

    created() {
        this.currentValue = this.defaultValue;
    },
    computed: {
    },

    methods: {
        switchValue() {
            this.currentValue = !this.currentValue;
            this.$emit('on-change', this.currentValue);
        },
    },
};
</script>

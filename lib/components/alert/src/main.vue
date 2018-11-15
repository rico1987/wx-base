<template>
    <transition name="wx-alert-fade">
        <div
            class="wx-alert"
        >
            <i class="wx-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
            <div class="wx-alert__content">
                <span class="wx-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'WxAlert',

    componentName: 'WxAlert',

    props: {
        title: {
            type: String,
            default: '',
            required: true,
        },

        description: {
            type: String,
            default: '',
        }
    },

    computed: {
        _wxFormItemSize() {
            return (this.wxFormItem || {}).wxFormItemSize;
        },
        buttonSize() {
            return this.size || this._wxFormItemSize || (this.$ELEMENT || {}).size;
        },
        buttonDisabled() {
            return this.disabled || (this.wxForm || {}).disabled;
        }
    },

    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
}
</script>

<template>
    <button
        class="wx-button"
        @click="handleClick"
        :disabled="buttonDisabled || loading"
        :autofocus="autofocus"
        :class="[
            type ? 'wx-button--' + type : '',
            buttonSize ? 'wx-button--' + buttonSize : '',
            {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
            }
        ]"
    >
        <i class="wx-icon-loading" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: 'WxButton',

    componentName: 'WxButton',

    inject: {
        wxForm: {
            default: ''
        },
        wxFormItem: {
            default: ''
        }
    },

    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: ''
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean,
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

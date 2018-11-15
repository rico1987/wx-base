<template>
  <transition name="dialog-fade">
    <div class="wx-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
        <div
            class="wx-dialog"
            :class="[{ 'is-fullscreen': fullscreen, 'is-center': center }, customClass]"
            ref="dialog"
            :style="style"
        >
            <div class="wx-dialog__header">
                <slot name="title">
                    <span class="wx-dialog__title">{{ title }}</span>
                </slot>
                <button
                    type="button"
                    class="wx-dialog__header-btn"
                    aria-label="Close"
                    v-if="showClose"
                    @click="handleClose"
                >
                    <i class="wx-dialog__icon-close wx-icon wx-icon-close"></i>
                </button>
            </div>
            <div class="wx-dialog__body" v-if="shouldRender">
                <slot></slot>
            </div>
            <div class="wx-dialog__footer" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'WxDialog',
    props: {
        title: {
            type: String,
            default: '',
        },

        appendToBody: {
            type: Boolean,
            default: false,
        },

        closeOnPressEscape: {
            type: Boolean,
            default: true,
        },

        showClose: {
            type: Boolean,
            default: true,
        },

        width: String,

        fullscreen: {
            type: Boolean,
            default: false,
        },

        beforeClose: Function,

        center: {
            type: Boolean,
            default: false,
        },
    },

    watch: {

    },

    computed: {
        style() {
            let style = {};
            if (this.width) {
                style.width = this.width;
            }
            if (!this.fullscreen) {
                style.marginTop = this.top;
            }
            return style;
        },
    },

    methods: {
        handleClose() {
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide);
            } else {
                this.hide();
            }
        },

        hide() {

        },
    },

    destroyed() {
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
    },
};
</script>

<template>
    <div class="mobile-message">
       <div class="mobile-message__mask" v-show="isShowMask && visible">
       </div>
       <transition :name="computedTransition">
            <div
                class="mobile-message__wrapper"
                :class="toastClass"
                :style="{width: width}"
                v-show="visible"
            >
                <p class="mobile-message__content" v-if="ntxt" v-html="ntxt"></p>
                <p class="mobile-message__content" v-else>
                    <slot></slot>
                </p>
            </div>
       </transition>
    </div>
</template>

<script>

const TYPE_ICON_CLASS_MAP = {
    'success': 'times-circle',
    'warning': 'times-circle',
    'error': 'times-circle',
};

export default {
    name: 'MobileMessage',

    componentName: 'MobileMessage',

    props: {
        isShowMask: {
            type: Boolean,
            default: false,
        },
        text: String,
        position: String,
        width: {
            type: String,
            default: 'auto',
        },
        showTime: {
            type: Number,
            default: 2000,
        },
        showIcon: {
            type: Boolean,
            default: false,
        },
        type: {
            // type: {
            //     validator: value => ['success', 'wrong', 'loading', ].indexOf(value) !== -1,
            // },
            type: String,
            default: 'success',
        },
        transition: String,
    },

    data() {
        return {
            visible: false,
            timeout: null,
            ntxt: this.text,
        };
    },

    computed: {
        computedTransition() {
            if (this.transition) {
                return this.transition;
            }

            if (this.position === 'top') {
                return 'mobile-transition-slide-from-top';
            }

            if (this.position === 'bottom') {
                return 'mobile-transition-slide-from-bottom';
            }

            return 'mobile-transition-fade';
        },

        toastClass() {
            return '';
        },

        iconClass() {
            return TYPE_ICON_CLASS_MAP[this.type];
        },
    },

    methods: {
        close() {
            this.visible = false;
            this.$emit('close');
        },
        msg(txt) {
            this.ntxt = txt;
            this.visible = true;
        },
    },

    watch: {
        visible(val) {
            if (val) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = false;
                    this.$emit('on-hide');
                }, this.showTime);
            }
        },
    },
};
</script>

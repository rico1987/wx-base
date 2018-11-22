<template>
    <div class="mobile-toast">
       <div class="mobile-toast__mask" v-show="isShowMask && visible">
       </div>
       <transition :name="computedTransition">
            <div
                class="mobile-toast__wrapper"
                :class="toastClass"
                :style="{width: width}"
                v-show="visible"
            >
                <Icon :type="iconClass" v-if="showIcon" />
                <p class="mobile-toast__content" v-if="text" v-html="text"></p>
                <p class="mobile-toast__content" v-else>
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
    name: 'MobileToast',

    componentName: 'MobileToast',

    props: {
        isShowMask: {
            type: Boolean,
            default: false,
        },
        text: String,
        position: String,
        width: {
            type: String,
            default: '8em',
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
    },

    watch: {
        visible(val) {
            if(val) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = false;
                    this.$emit('on-hide');
                }, this.showTime);
            }
        }
    },
};
</script>

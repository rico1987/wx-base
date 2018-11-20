<template>
    <div class="mobile-toast">
       <div class="mobile-toast__mask" v-show="isShowMask && show">
       </div>
       <transition>
            <div
                class="mobile-toast__content"
                :class="toastClass"
                :style="{width: width}"
                v-show="show"
            >
                <p class="mobile-toast__text" v-if="text" v-html="text"></p>
                <p class="mobile-toast__text" v-else>
                    <slot></slot>
                </p>
            </div>
       </transition>
    </div>
</template>

<script>
export default {
    name: 'MobileToast',

    componentName: 'MobileToast',

    props: {
        isShowMask: {
            type: Boolean,
            default: false
        },
        text: String,
        position: String,
        width: {
            type: String,
            default: '8em'
        },
        showTime: {
            type:Number,
            default: 2000
        },
    },

    computed: {
        toastClass () {

        },
    },

    methods: {

    },
};
</script>

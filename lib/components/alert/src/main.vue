<template>
    <transition name="wx-alert-fade">
        <div
            class="wx-alert"
            :class="[ typeClass, center ? 'is-center' : '' ]"
            v-show="visible"
            role="alert"
        >
            <i class="wx-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
            <div class="wx-alert__content">
                <span class="wx-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
                <slot>
                    <p class="wx-alert__description" v-if="description">{{ description }}</p>
                </slot>
                <i
                    class="wx-alert__closebtn"
                    :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === ''}"
                    v-show="showCloseBtn"
                    @click="close()"
                >
                {{ closeText }}
                </i>
            </div>
        </div>
    </transition>
</template>

<script>
const TYPE_CLASSES_MAP = {
    'success': 'wx-icon-success',
    'warning': 'wx-icon-warning',
    'error': 'wx-icon-error',
};

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
        },

        type: {
            type: String,
            default: 'info',
        },

        showCloseBtn: {
            type: Boolean,
            default: true,
        },

        closeText: {
            type: String,
            default: '',
        },

        showIcon: {
            type: Boolean,
            default: true,
        },

        center: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            visible: true,
        }
    },

    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
}
</script>

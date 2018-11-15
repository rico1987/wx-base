<template>
    <div
        :class="[
            type === "textarea" ? "wx-textarea" : "wx-input",
            inputSize ? 'wx-input--' + inputSize : '',

        ]"

    >
    </div>
</template>

<script>
export default {
    name: 'WxInput',

    componentName: 'WxInput',

    data() {

    },

    props() {
        value: [String, Number],
        type: {
            type: String,
            default: 'text',
        },
    },
}
</script>

<template>
    <i
        :class="className"
        :data-fa-transform="transform"
    ></i>
</template>

<script>
export default {
    name: 'MobileIcon',

    componentName: 'MobileIcon',

    props: {
        type: String,
        size: String,
        transform: {
            type: String,
            default: '',
        },
    },

    computed: {
        className() {
            return `fas fa-${this.type}`;
        },
    },
};
</script>
<style lang="scss">
</style>

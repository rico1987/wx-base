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
            return `fas ${this.type.split(' ').map(ele => `fa-${ele}`).join(' ')}`;
        },
    },
};
</script>
<style lang="scss">
</style>

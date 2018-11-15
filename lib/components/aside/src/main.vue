<template>
    <aside class="wx-aside" :style="{ width }">
        <slot></slot>
    </aside>
</template>

<script>
export default {
    name: 'WxAside',

    componentName: 'WxAside',

    props: {
        width: {
            type: String,
            default: '300px',
        },
    },
};
</script>

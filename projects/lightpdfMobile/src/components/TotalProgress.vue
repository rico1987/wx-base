<template>
    <div class="total-progress">
        <div class="blue-bar"></div>
        <div class="progress-txt">1/15 converting</div>
    </div>
</template>

<script>
export default {
    name: 'TotalProgress',

    componentName: 'TotalProgress',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },

    provide() {
        return {
            TotalProgress: this,
        };
    },
};
</script>

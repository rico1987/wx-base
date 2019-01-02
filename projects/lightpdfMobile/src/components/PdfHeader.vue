<template>
    <div class="pdf-header">
        <div class="header-title">我的文件</div>
        <div class="back-bar"></div>
    </div>
</template>

<script>
export default {
    name: 'PdfHeader',

    componentName: 'PdfHeader',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },

    provide() {
        return {
            PdfHeader: this,
        };
    },
};
</script>

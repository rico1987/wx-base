<template>
    <div class="convert-file-item">
        <div class="file-img"></div>
        <div class="item-file-name">2018_PDF.pdf</div>
        <div class="right-box">
            <div class="progress-box">
                <div class="progress-txt">36%</div>
                <div class="bar-box">
                    <div class="bar"></div>
                    <div class="state-img"></div>
                </div>
            </div>
            <div class="del-btn"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConvertFileItem',

    componentName: 'ConvertFileItem',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },

    provide() {
        return {
            ConvertFileItem: this,
        };
    },
};
</script>

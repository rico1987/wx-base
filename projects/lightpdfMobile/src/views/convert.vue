<template>
    <div class="convert-container">
        <pdf-header></pdf-header>
        <div class="convert-file-panel">
            <div class="add-file-btn">
                <p class="btn-des">选择文件</p>
            </div>
            <div class="convert-file-list">
                <convert-file-item></convert-file-item>
                <convert-file-item></convert-file-item>
                <convert-file-item></convert-file-item>
                <convert-file-item></convert-file-item>
            </div>
            <total-progress></total-progress>
            <div class="convert-start-btn">确认转换</div>
            <div class="convert-stop-btn">取消转换</div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import ConvertFileItem from '../components/ConvertFileItem.vue';
import TotalProgress from '../components/TotalProgress.vue';

export default {
    name: 'convertList',
    components: {
        'pdf-header': PdfHeader,
        'convert-file-item': ConvertFileItem,
        'total-progress': TotalProgress,
    },
    data() {
        return {
        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

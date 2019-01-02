<template>
    <div class="frompdf-container">
        <pdf-header></pdf-header>
        <div class="upload-top-bg"></div>
        <div class="upload-box">
            <div class="add-btn add-icon">
                <div class="blue-bg">
                    <div class="gray-ring"></div>
                    <div class="white-circle"></div>
                    <div class="blue-circle"></div>
                    <div class="plus"></div>
                </div>
            </div>
            <div class="add-des">选择文件</div>
            <input
                type="file"
                accept
                draggable="false"
                class="file-input select-pdf-input"
                ref="input"
                title=" "
            >
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';

export default {
    name: 'fromPdf',
    components: {
        'pdf-header': PdfHeader,
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

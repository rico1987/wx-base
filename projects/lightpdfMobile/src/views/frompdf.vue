<template>
    <div class="frompdf-container">
        <div class="inner-container">
            <pdf-header></pdf-header>
            <div v-show="isBigShow" ref="bigBtnEl" class="upload-panel">
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
                        accept=".pdf"
                        draggable="false"
                        class="file-input select-pdf-input"
                        ref="bigInput"
                        title=" "
                        @change="referenceUpload($event)"
                        multiple
                    >
                </div>
            </div>
            <div v-show="isListShow" class="convert-file-panel">
                <div class="add-file-btn">
                    <p class="btn-des">选择文件</p>
                    <input
                        type="file"
                        accept=".pdf"
                        draggable="false"
                        class="file-input select-pdf-input"
                        ref="smallInput"
                        title=" "
                        @change="smallReferenceUpload($event)"
                        multiple
                    >
                </div>
                <div v-for="(item) in fileList" class="convert-file-list" :key="item.id">
                    <convert-file-item :fileData="item" @del-file="delFileItem(item)"></convert-file-item>
                </div>
                <total-progress></total-progress>
                <div v-show="isSureShow" class="convert-start-btn" @click="start">确认转换</div>
                <div v-show="isStopShow" class="convert-stop-btn">取消转换</div>
            </div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import ConvertFileItem from '../components/ConvertFileItem.vue';
import TotalProgress from '../components/TotalProgress.vue';
import Uploader from '../utils/upload';

export default {
    name: 'fromPdf',
    components: {
        'pdf-header': PdfHeader,
        'convert-file-item': ConvertFileItem,
        'total-progress': TotalProgress,
    },
    data() {
        return {
            fileCount: 0,
            maxSize: 1024 * 1024 * 10,
            isBigShow: true,
            isListShow: false,
            isSureShow: false,
            isStopShow: false,
            currentFile: null,
            fileList: [],
            index: 0,
        };
    },

    created: function() {
    },
    methods: {
        referenceUpload: function(e) {
            let list = [...e.target.files, ];
            this.currentFile = list;
            this.$refs.bigInput.value = null;
            for (let i = 0; i < list.length; i += 1) {
                this.addToList(list[i]);
            }
            this.isBigShow = false;
            this.isListShow = true;
        },
        smallReferenceUpload: function(e) {
            let list = [...e.target.files, ];
            this.$refs.smallInput.value = null;
            for (let i = 0; i < list.length; i += 1) {
                this.addToList(list[i]);
            }
        },
        checkFileSize: function(file) {
            return file && file.size <= this.maxSize;
        },
        getInfoData: function(file) {
            let item = {
                file: file,
                state: 0,
                progress: 0,
                id: 0,
            };
            this.fileCount += 1;
            item.id = this.fileCount;
            return item;
        },
        addToList: function(file) {
            if (this.checkFileSize(file)) {
                let item = this.getInfoData(file);
                item.progress = this.fileList.length + 1;
                item.state = 1;
                this.fileList.push(item);
            }
            console.log(this.fileList);
            if (this.fileList.length) {
                this.isSureShow = true;
            }
        },
        renderList: function() {
            console.log('33');
        },
        delFileItem: function(data) {
            let index = this.fileList.indexOf(data);
            this.fileList.splice(index, 1);
        },
        start: function() {
            // 开始处理 上传 转换
            let file = this.getCurrentConvertData().file;
            let uploader = Uploader.create(file, this.authorizeProgress, this.uploadOssOk, this.fileOssError, this.returnProgress, this, 1);
            console.log(uploader);
            debugger
            uploader.start();
        },
        uploadOssOk: function(res, file) {
            console.log(res, file);
        },
        fileOssError: function(data) {
            console.log(data);
        },
        returnProgress: function(data) {
            console.log(data);
        },
        authorizeProgress: function() {
            let item = this.getCurrentConvertData();
            item.progress = 4;
        },
        getCurrentConvertData: function() {
            return this.fileList[this.index];
        },
    },
};
</script>

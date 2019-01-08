<template>
    <div class="frompdf-container">
        <div class="inner-container">
            <pdf-header ref="header" :type="taskName"></pdf-header>
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
                        v-show="!isConverting"
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
                <div class="convert-file-list">
                    <convert-file-item v-for="item in fileList" :key="item.id"
                    :fileData="item" @del-file="delFileItem(item)"></convert-file-item>
                </div>
                <total-progress ref="progress" v-show="isConverting"></total-progress>
                <div v-show="isSureShow" class="convert-start-btn" @click="start">确认转换</div>
                <div v-show="isStopShow" class="convert-stop-btn"
                @click="stop"
                >取消转换</div>
            </div>
            <message ref="msg" :transition="'fade'"></message>
            <pdf-pwd ref="pwd" @on-set="pwdSet"></pdf-pwd>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import ConvertFileItem from '../components/ConvertFileItem.vue';
import TotalProgress from '../components/TotalProgress.vue';
import Uploader from '../utils/upload';
import Message from '../components/Message.vue';
import Password from '../components/Password.vue';
import pwdCheck from '../utils/pwdCheck';
import {createTask, getTaskInfo, } from '../api/pdf';
import TimeManager from '../utils/timeManager';
import his from '../utils/pathHistory';
import resultData from '../utils/convertResult';

export default {
    name: 'fromPdf',
    components: {
        'pdf-header': PdfHeader,
        'convert-file-item': ConvertFileItem,
        'total-progress': TotalProgress,
        'message': Message,
        'pdf-pwd': Password,
    },
    data() {
        return {
            fileCount: 0,
            maxSize: 1024 * 1024 * 30,
            isBigShow: true,
            isListShow: false,
            isSureShow: false,
            isStopShow: false,
            isProgressShwo: false,
            currentFile: null,
            fileList: [],
            index: 0,
            pwdCheckObj: null,
            taskName: 'pdf-to-word',
            format: '',
            infoTimerId: -1,
            infoTime: 0,
            isConverting: false,
            isStop: 0,
        };
    },

    created: function() {
        this.pwdCheckObj = pwdCheck.create();
        this.pwdCheckObj.on('pwd-err', this.pwdErr);
        this.pwdCheckObj.on('pdf-err', this.pdfErr);
        this.pwdCheckObj.on('pdf-ok', this.pwdOk);
        this.pwdCheckObj.on('pdf-finish', this.pwdFinish);
        console.log(this.$route);
        his.push(this.$router.history.current);
        if (this.$route.query.type) {
            this.taskName = this.$route.query.type;
            if (this.$route.query.type === 'pdf-to-png') {
                this.taskName = 'pdf-to-image';
                this.format = 'png';
            }
            if (this.$route.query.type === 'pdf-to-jpg') {
                this.taskName = 'pdf-to-image';
                this.format = 'jpg';
            }
        }
    },
    methods: {
        updateHeader() {
            if (this.$route.query.type) {
                this.taskName = this.$route.query.type;
                this.$refs.header;
                // this.$refs.header.type = this.taskName;
            }
        },
        referenceUpload: function(e) {
            let list = [...e.target.files, ];
            this.currentFile = list;
            this.$refs.bigInput.value = null;
            for (let i = 0; i < list.length; i += 1) {
                // this.addToList(list[i]);
                // this.checkInfo(list[i]);
                this.checkSize(list[i]);
                // this.pwdCheckObj.push(list[i]);
            }
            this.isBigShow = false;
            this.isListShow = true;
        },
        smallReferenceUpload: function(e) {
            let list = [...e.target.files, ];
            this.$refs.smallInput.value = null;
            for (let i = 0; i < list.length; i += 1) {
                // this.addToList(list[i]);
                this.checkSize(list[i]);
            }
        },
        pwdErr(data) {
            console.log(data);
            console.log('pwdErr');
            let fileName = data.name;
            this.showPwd(fileName);
        },
        pdfErr(data) {
            console.log(data);
            console.log('pdfErr');
            this.msg('file type err');
        },
        pwdOk(data) {
            console.log(data);
            console.log('pwdok');
            let item = this.getInfoData(data.file, data.pwd);
            this.addToList(item);
        },
        pwdFinish(data) {
            console.log(data);
            console.log('pwdFinish');
            this.checkShowBtn();
        },
        checkShowBtn() {
            if (this.fileList.length === 0) {
                this.isSureShow = false;
            }
        },
        pwdSet() {
            let str = this.$refs.pwd.pwd;
            console.log(str);
            this.pwdCheckObj.checkPwd(str);
        },
        checkInfo(file) {
            window.wpdf.getPdfInfo({
                password: '',
                file: file,
            }, this.pdfInfoBack, this);
        },
        pdfInfoBack(data) {
            console.log(data);
        },
        checkSize(file) {
            this.msg('checksize');
            if (this.checkFileSize(file)) {
                this.pwdCheckObj.push(file);
            } else {
                // big;
                this.checkShowBtn();
            }
        },
        checkFileSize: function(file) {
            return file && file.size <= this.maxSize;
        },
        getInfoData: function(file, pwd) {
            let item = {
                file: file,
                // 0 未开始 1 进行中 2 完成 3错误
                state: 0,
                progress: 0,
                id: 0,
                fileId: '',
                pwd: pwd || '',
                taskId: '',
                targetUrl: '',
                targetName: '',
            };
            this.fileCount += 1;
            item.id = this.fileCount;
            return item;
        },
        addToList: function(item) {
            this.fileList.push(item);
            item.state = 1;
            this.isSureShow = true;
        },
        addToListOld: function(file) {
            if (this.checkFileSize(file)) {
                let item = this.getInfoData(file);
                item.progress = this.fileList.length + 1;
                item.state = 1;
                this.fileList.push(item);
            }
            console.log(this.fileList);
            this.checkShowBtn();
        },
        renderList: function() {
            console.log('33');
        },
        delFileItem: function(data) {
            let index = this.fileList.indexOf(data);
            this.fileList.splice(index, 1);
            this.checkShowBtn();
        },
        showPwd: function(des) {
            this.$refs.pwd.msg(des);
        },
        msg: function(txt) {
            this.$refs.msg.msg(txt);
            console.log('msg');
        },
        start: function() {
            // 开始处理 上传 转换
            let file = this.getCurrentConvertData().file;
            let uploader = Uploader.create(file, this.authorizeProgress, this.uploadOssOk, this.fileOssError, this.returnProgress, this, 1);
            console.log(uploader);
            uploader.start();
            this.isSureShow = false;
            this.isStopShow = true;
            this.isConverting = true;
            this.updateTotalProgressBar();
        },
        updateTotalProgressBar() {
            let totalNum = this.fileList.length;
            let index = this.index;
            this.$refs.progress.totalNum = totalNum;
            this.$refs.progress.index = index;
        },
        next() {
            if (this.isstop) {
                return;
            }
            this.index += 1;
            this.updateTotalProgressBar();
            let item = this.getCurrentConvertData();
            if (!item) {
                // finished
                this.isConverting = false;
                this.index = 0;
                this.isStopShow = false;
                this.showResult();
                return;
            }
            this.start();
        },
        stop() {
            this.isStop = 1;

        },
        uploadOssOk: function(res, file) {
            let data = res.data.data;
            let item = this.getCurrentConvertData();
            item.fileId = data.id;
            file;
            // console.log(res, file, 3);
            this.setProgress(4 + 10);
            this.toCreateTask();
        },
        getFileConfig(item) {
            return {
                file_id: item.fileId,
                password: item.pwd,
            };
        },
        toCreateTask() {
            let obj = {
                service_type: this.taskName,
                autostart: true,
                files: [this.getFileConfig(this.getCurrentConvertData()), ],
                args: this.getArg(),
            };
            let _this = this;
            createTask(obj).then((data) => {
                console.log('taskok');
                console.log(data);
                let taskId = data.data.data.task_id;
                _this.getCurrentConvertData().taskId = taskId;
                _this.checkProgress(taskId);
            }).catch((data) => {
                console.log('err');
                console.log(data);
                _this.getCurrentConvertData().state = 3;
                _this.next();
            });
        },
        getArg() {
            let arg = {};
            switch (this.taskName) {
            case 'pdf-to-image':
                arg.format = this.format;
                break;
            default:
                break;
            }
            return arg;
        },
        checkProgress(id) {
            // check
            console.log('check-progress', id);
            let checkInfo = function() {
                this.infoTime += 1;
                let _this = this;
                // eslint-disable-next-line
                getTaskInfo(id).then((response) => {
                    _this.progressBack(response.data);
                }).catch((response) => {
                    _this.progressErr(response.data);
                });
                if (this.infoTime >= 500) {
                    this.removeTaskInfoTimer();
                }
            }.bind(this);
            var timer = TimeManager.timer(checkInfo, 1000, this);
            this.infoTimerId = timer.id;
            TimeManager.addTimer(timer);
        },
        removeTaskInfoTimer() {
            if (this.infoTimerId === -1) {
                return;
            }
            TimeManager.delTimer(this.infoTimerId);
            this.infoTimerId = -1;
        },
        progressBack(res) {
            // aaa
            console.log(res);
            console.log('progress--back');
            if (!res.data || res.status !== '1') {
                // 错误
                // debugger;
                this.removeTaskInfoTimer();
                // this.onConvertFailed();
                return;
            }
            switch (res.data.status) {
            case 0:
                // 未开始
                break;
            case 1:
                // 进行中
                this.onConvertProgress(res.data.progress);
                break;
            case 2:
                // 完成
                this.removeTaskInfoTimer();
                this.onConvertProgress(res.data.progress);
                this.onConvertSuccess(res);
                break;
            case -10:
                // 错误
                this.removeTaskInfoTimer();
                // this.onConvertFailed();
                break;
            case -5:
                // InvalidFileFormat
                // this.filefromatErr(res.data.errors);
                break;
            default:
                // 错误
                this.removeTaskInfoTimer();
                // this.onConvertFailed();
            }
        },
        onConvertProgress(num) {
            console.log('progress-', num);
            this.setProgress(14 + parseInt((86 * num) / 100, 10));
        },
        onConvertSuccess(data) {
            console.log(data);
            let item = this.getCurrentConvertData();
            let status = data.data.status;
            if (status === 2) {
                let targetFile = data.data.target_file;
                item.state = 2;
                item.targetUrl = targetFile.url;
                item.targetName = targetFile.filename;
            } else {
                item.state = 3;
            }
            this.next();
            // this.pwdCheckObj.next();

        },
        progressErr(response) {
            // aaa
            console.log(response);
        },
        fileOssError: function(data) {
            console.log(data);
        },
        returnProgress: function(data) {
            // console.log(data);
            this.setProgress(4 + parseInt(data * 10, 10));
        },
        setProgress: function(num) {
            let item = this.getCurrentConvertData();
            item.progress = num;
        },
        authorizeProgress: function() {
            this.setProgress(4);
            console.log('98989898');
        },
        getCurrentConvertData: function() {
            return this.fileList[this.index];
        },
        getTargetFileList() {
            let arr = [];
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                if (item && item.state === 2 && item.targetUrl) {
                    arr.push({
                        targetName: item.targetName,
                        targetUrl: item.targetUrl,
                    });
                }
            }
            return arr;
        },
        showResult() {
            resultData.targetList = this.getTargetFileList();
            this.$router.push({
                path: '/convertresult',
            });
        },
    },
};
</script>

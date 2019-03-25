<template>
    <div class="frompdf-container">
        <div class="inner-container">
            <pdf-header ref="header" :headertype="type">{{headerTitle}}</pdf-header>
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
                    <div class="add-des">{{$tr('Choose file@@000821')}}</div>
                    <input
                        type="file"
                        :accept="accept"
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
                    <p class="btn-des">{{$tr('Choose file@@000821')}}</p>
                    <input
                        type="file"
                        :accept="accept"
                        draggable="false"
                        class="file-input select-pdf-input"
                        ref="smallInput"
                        title=" "
                        @change="smallReferenceUpload($event)"
                        v-show="!isConverting"
                        multiple
                    >
                </div>
                <div class="convert-file-list">
                    <convert-file-item v-for="item in fileList" :key="item.id"
                    :fileData="item" @del-file="delFileItem(item)"></convert-file-item>
                </div>
                <total-progress ref="progress" v-show="isConverting"></total-progress>
                <div v-show="isSureShow" class="convert-start-btn" @click="start">{{$tr('Convert@@001834')}}</div>
                <div v-show="isStopShow" class="convert-stop-btn"
                @click="stop"
                >{{$tr('Cancel@@cancel')}}</div>
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
import convert from '../utils/convert';
import {saveNativeData, getNativeData, } from '../utils';
import ls from '../utils/littleStore';

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
            maxSize: 1024 * 1024 * 300,
            isBigShow: true,
            isListShow: false,
            isSureShow: false,
            isStopShow: false,
            isProgressShwo: false,
            currentFile: null,
            fileList: [],
            index: 0,
            pwdCheckObj: null,
            type: 'pdf-to-word',
            taskName: 'pdf-to-word',
            format: '',
            infoTimerId: -1,
            infoTime: 0,
            isConverting: false,
            isStop: 0,
            accept: '.pdf',
            acceptMap: {
                'pdf-to-word': '.pdf',
                'pdf-to-jpg': '.pdf',
                'pdf-to-png': '.pdf',
                'pdf-to-ppt': '.pdf',
                'pdf-to-excel': '.pdf',
                'pdf-to-txt': '.pdf',
                'pdf-to-text': '.pdf',
                'word-to-pdf': '.doc,.docx',
                'excel-to-pdf': '.xls,.xlsx',
                'png-to-pdf': '.png,.jpg,.jpeg,.heic,.gif',
                'jpg-to-pdf': '.png,.jpg,.jpeg,.heic,.gif',
                'ppt-to-pdf': '.ppt,.pptx',
            },
            convertkey: [
                {
                    key: 'pdf-to-word',
                    trkey: 'PDF to Word@@002074',
                },
                {
                    key: 'pdf-to-excel',
                    trkey: 'PDF to Excel@@001819',
                },
                {
                    key: 'pdf-to-ppt',
                    trkey: 'PDF to Ppt@@002075',
                },
                {
                    key: 'pdf-to-jpg',
                    trkey: 'PDF to Jpg@@001820',
                },
                {
                    key: 'pdf-to-png',
                    trkey: 'PDF to Png@@001821',
                },
                {
                    key: 'pdf-to-txt',
                    trkey: 'PDF to Text@@001823',
                },
                {
                    key: 'pdf-to-text',
                    trkey: 'PDF to Text@@001823',
                },
            ],
            headerTitle: '',
        };
    },

    created: function() {
        this.pwdCheckObj = pwdCheck.create();
        this.pwdCheckObj.on('pwd-err', this.pwdErr);
        this.pwdCheckObj.on('pdf-err', this.pdfErr);
        this.pwdCheckObj.on('pdf-ok', this.pwdOk);
        this.pwdCheckObj.on('pdf-finish', this.pwdFinish);
        his.push(this.$router.history.current);
        if (this.$route.query.type) {
            let type = this.$route.query.type;
            this.taskName = type;
            this.type = type;
            if (this.$route.query.type === 'pdf-to-png') {
                this.taskName = 'pdf-to-image';
                this.format = 'png';
            }
            if (this.$route.query.type === 'pdf-to-jpg') {
                this.taskName = 'pdf-to-image';
                this.format = 'jpg';
            }
            this.accept = this.acceptMap[type] || '.pdf';
        }
        this.setTitleStr();
        let saveData = getNativeData();
        let pdfSession = saveData['pdf_api_token'] || ls.get('api_token') || '';
        if (pdfSession !== '') {
            saveNativeData(saveData);
            ls.set('api_token', pdfSession);
        } else {
            convert.getSession().then((response) => {
                console.log('sesson pdf back', response);
            }).catch((error) => {
                console.log('error', error);
            });
        }
    },
    methods: {
        setTitleStr() {
            this.convertkey;
            let item;
            for (let i = 0; i < this.convertkey.length; i += 1) {
                item = this.convertkey[i];
                if (item.key === this.type) {
                    this.headerTitle = this.$tr(item.trkey);
                    break;
                }
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
            // console.log('pwdErr');
            let fileName = data.name;
            this.showPwd(fileName);
        },
        pdfErr() {
            // console.log('pdfErr');
            this.msg(this.$tr('Invalid file type@@002166'));
        },
        pwdOk(data) {
            // console.log('pwdok');
            let item = this.getInfoData(data.file, data.pwd);
            this.addToList(item);
        },
        pwdFinish() {
            // console.log('pwdFinish');
            this.checkShowBtn();
        },
        checkShowBtn() {
            if (this.fileList.length === 0) {
                this.isSureShow = false;
            }
        },
        pwdSet() {
            let str = this.$refs.pwd.pwd;
            // console.log(str);
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
            // this.msg('checksize');
            console.log('----09090', file);
            let ext = file.name;
            if (ext.lastIndexOf('.') !== -1) {
                ext = ext.substring(ext.lastIndexOf('.'));
            } else {
                ext = '';
            }
            if (!ext) {
                this.pdfErr();
                return;
            }
            let acceptArr = this.accept.split(',');
            if (acceptArr.indexOf(ext.toLowerCase()) === -1) {
                this.pdfErr();
                return;
            }
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
                ext: '',
                isConverting: false,
            };
            this.fileCount += 1;
            item.id = this.fileCount;
            let ext = '';
            let dotIndex = file.name.lastIndexOf('.');
            if (dotIndex !== -1) {
                ext = file.name.substring(dotIndex + 1, file.name.length);
            }
            item.ext = ext.toLowerCase();
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
            // console.log(this.fileList);
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
            // console.log('msg');
        },
        start: function() {
            console.log('start---start');
            // 开始处理 上传 转换
            if (this.isStop) {
                return;
            }
            let file = this.getCurrentConvertData().file;
            let uploader = Uploader.create(file, this.authorizeProgress, this.uploadOssOk, this.fileOssError, this.returnProgress, this, 1);
            // console.log(uploader);
            uploader.start();
            this.isSureShow = false;
            this.isStopShow = true;
            this.isConverting = true;
            this.setAllItemConvertingState(true);
            this.updateTotalProgressBar();
        },
        setAllItemConvertingState(flag) {
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                item.isConverting = flag;
            }
        },
        updateTotalProgressBar() {
            let totalNum = this.fileList.length;
            let index = this.index;
            this.$refs.progress.totalNum = totalNum;
            this.$refs.progress.index = index;
        },
        next() {
            if (this.isStop) {
                return;
            }
            // debugger;
            console.log('next---', this.index);
            console.log(this.fileList.length);
            if (this.isstop) {
                return;
            }
            this.index += 1;
            this.updateTotalProgressBar();
            let item = this.getCurrentConvertData();
            if (this.fileList.length === 0) {
                this.index = 0;
                return;
            }
            if (!item) {
                // finished
                this.isConverting = false;
                this.setAllItemConvertingState(false);
                this.index = 0;
                this.isStopShow = false;
                // if (this.checkAllState()) {
                // this.showResult();
                setTimeout(() => {
                    this.showResult();
                }, 300);
                // }
                return;
            }
            this.start();
        },
        checkAllState() {
            let flag = true;
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                if (item.state !== 2) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        stop() {
            console.log('ssstop');
            // stop and cancel task
            this.isStop = 1;
            this.resetAll();
        },
        resetAll() {
            // aaa;
            this.removeTaskInfoTimer();
            this.isConverting = false;
            this.fileList = [];
            this.isListShow = true;
            this.isSureShow = false;
            this.isStopShow = false;
            this.index = 0;
            this.isStop = 0;
        },
        uploadOssOk: function(res, file) {
            console.log(file);
            if (this.isStop) {
                // this.stop();
                return;
            }
            let data = res.data.data;
            let item = this.getCurrentConvertData();
            console.log('file === file', item.file === file);
            if (!item || item.file !== file) {
                console.log('nofile');
                return;
            }
            if (data['app_data']) {
                item.fileId = data['app_data']['id'];
            } else {
                item.fileId = data.id;
            }
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
            if (this.isStop) {
                // this.stop();
                return;
            }
            let item = this.getCurrentConvertData();
            if (!item) {
                return;
            }
            let fileConfig = this.getFileConfig(item);
            if (!fileConfig.file_id) {
                return;
            }
            let obj = {
                service_type: this.taskName,
                autostart: true,
                files: [fileConfig, ],
                args: this.getArg(),
            };
            let _this = this;
            createTask(obj).then((data) => {
                // console.log('taskok');
                // console.log(data);
                let taskId = data.data.data.task_id;
                let item = _this.getCurrentConvertData();
                if (item) {
                    item.taskId = taskId;
                    _this.checkProgress(taskId);
                }
            }).catch(() => {
                // debugger;
                console.log('err');
                // console.log(data);
                let item = _this.getCurrentConvertData();
                if (item) {
                    item.state = 3;
                }
                // console.log('createErr-next');
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
            // console.log('check-progress', id);
            let checkInfo = function() {
                if (this.isStop) {
                    // this.stop();
                    return;
                }
                this.infoTime += 1;
                let _this = this;
                // eslint-disable-next-line
                console.log('infotimerId:', _this.infoTimerId);
                getTaskInfo(id).then((response) => {
                    console.log('----');
                    console.log(response);
                    _this.progressBack(response);
                }).catch((response) => {
                    _this.progressErr(response.data);
                });
                if (this.infoTime >= 500) {
                    this.removeTaskInfoTimer();
                }
            }.bind(this);
            var timer = TimeManager.timer(checkInfo, 1000, this);
            this.infoTimerId = timer.id;
            console.log('new timer id', timer.id);
            TimeManager.addTimer(timer);
        },
        removeTaskInfoTimer() {
            console.log('removeTaskInfoTimer', this.infoTimerId);
            if (this.infoTimerId === -1) {
                return;
            }
            TimeManager.delTimer(this.infoTimerId);
            this.infoTimerId = -1;
        },
        getReponseTaskId(resp) {
            // 获取url里面的taskId 用来对应 任务状态
            let taskId = '';
            let url = resp.request.responseURL;
            if (url && url.length > 1) {
                url = url.replace(/.*\//, '');
                url = url.replace(/\?.*/, '');
                taskId = url;
            }
            return taskId;
        },
        progressBack(resp) {
            // aaa
            // console.log(res);
            let res = resp.data;
            let taskId = this.getReponseTaskId(resp);
            let item = this.getCurrentConvertData();
            if (taskId && item && item.taskId !== taskId) {
                return;
            }
            console.log('progress--back');
            console.log(res.data);
            console.log(res.data.status);
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
                console.log('case 2');
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
            // console.log('progress-', num);
            this.setProgress(14 + parseInt((86 * num) / 100, 10));
        },
        onConvertSuccess(data) {
            // console.log(data);
            let item = this.getCurrentConvertData();
            if (!item) {
                this.next();
                return;
            }
            let status = data.data.status;
            if (status === 2) {
                let targetFile = data.data.target_file;
                item.state = 2;
                item.targetUrl = targetFile.url;
                item.targetName = targetFile.filename;
            } else {
                item.state = 3;
            }
            console.log('onConvertSuccess-next');
            this.next();
            // this.pwdCheckObj.next();

        },
        progressErr(response) {
            // aaa
            console.log(response);
        },
        fileOssError: function() {
            // console.log(111);
            // console.log(data);
            // console.log(333);
            let item = this.getCurrentConvertData();
            if (item) {
                item.state = 3;
            }
            this.next();
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
            // console.log('98989898');
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
            // console.log('showresulettttt');
            this.$router.push({
                path: '/convertresult',
                query: {
                    type: this.type,
                },
            });
        },
    },
};
</script>

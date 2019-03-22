<template>
    <div class="download-bar" v-bind:style="{ display: cssDisplay }">
        <p class="total">{{totalIndex}}/{{totalNum}}</p>
        <p class="file-name">{{currentName}}</p>
        <p v-if="!isComplete" class="progress">{{currentProgress}}%</p>
        <div v-if="isComplete" class="open-btn" @click="goLocalFile">{{$tr('Open Folder@@001836')}}</div>
    </div>
</template>

<script>
import {nativeDownload, getDownloadProgress, openFolder, } from '../utils/index';
import TimeManager from '../utils/timeManager';

export default {
    name: 'DownloadBar',

    componentName: 'DownloadBar',

    props: [
        'item',
    ],
    data() {
        return {
            isShowDel: 0,
            fileList: [],
            uniqKey: 0,
            downloadPool: [],
            index: 0,
            id: -1,
            taskList: [],
            infoTimerId: -1,
            totalNum: 0,
            totalIndex: 0,
            currentName: '',
            currentProgress: '',
            isComplete: 0,
            cssDisplay: 'none',
        };
    },
    computed: {
        state() {
            return this.item.start;
        },
    },
    methods: {
        addTask(url, fileName) {
            let item = this.creatItem(url, fileName);
            this.taskList.push(item);
            this.cssDisplay = 'block';
            this.isComplete = 0;
            this.startTask();
        },
        creatItem(url, fileName) {
            let item = {};
            item.url = url;
            item.fileName = fileName;
            item.id = -1;
            item.progress = 0;
            return item;
        },
        startTask() {
            console.log('startTask');
            console.log(this.taskList);
            let item = this.taskList[this.index];
            if (item === null) {
                return;
            }
            this.currentName = item.fileName;
            this.currentProgress = item.progress;
            this.totalNum = this.taskList.length;
            this.totalIndex = this.index + 1;

            if (item.id > -1 && item.progress === 100) {
                this.next();
            }
            if (item.id === -1 && item.progress === 0) {
                item.id = nativeDownload(item.url, item.fileName);
                this.check();
            }
        },
        next() {
            if (this.index + 1 >= this.taskList.length) {
                // complete
                this.totalNum = this.taskList.length;
                this.totalIndex = this.index + 1;
                this.isComplete = 1;
                return;
            }
            this.index += 1;
            this.startTask();
        },
        // download() {
        //     console.log('---', process.isIos);
        //     if (process.isIos && window.account) {
        //         this.id = nativeDownload(this.url, this.fileName);
        //     } else {
        //         this.$refs.a.click();
        //     }
        // },
        check() {
            this.removeTaskInfoTimer();
            var timer = TimeManager.timer(this.checkInfo, 1000, this);
            this.infoTimerId = timer.id;
            TimeManager.addTimer(timer);
        },
        checkInfo() {
            let item = this.taskList[this.index];
            if (!item) {
                this.removeTaskInfoTimer();
                return;
            }
            let progress = getDownloadProgress(item.id);
            item.progress = progress;
            this.currentName = item.fileName;
            this.currentProgress = item.progress;
            console.log('progress');
            console.log(item);
            if (progress === 100) {
                this.removeTaskInfoTimer();
                this.next();
            }
        },
        removeTaskInfoTimer() {
            if (this.infoTimerId === -1) {
                return;
            }
            TimeManager.delTimer(this.infoTimerId);
            this.infoTimerId = -1;
        },
        goLocalFile() {
            openFolder();
        },
    },
    watch: {
        // state(nvalue) {
        //     if (nvalue) {
        //         // this.$refs.a.click();
        //         this.item.start = 0;
        //         this.download();
        //     }
        // },
    },
};
</script>

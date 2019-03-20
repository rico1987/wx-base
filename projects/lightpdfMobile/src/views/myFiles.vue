<template>
    <div class="myfile-container">
        <div class="inner-container">
            <div class="myfile-panel">
                <pdf-header ref="header" :headertype="'my-files'" @click-jump="onBack">{{$tr('Network files@@002164')}}</pdf-header>
                <div class="search-bar">
                    <input type="text" ref="searchInput" class="search" placeholder="搜索文件">
                    <div class="search-btn" @click="onSearch"></div>
                </div>
                <div class="my-file-list" ref="List" @touch="onTouch"  @touchstart="onTouchStart"
                @touchend="onTouchEnd" @touchmove="onTouchMove">
                    <myfile-item v-for="item in fileList" :key="item.uniqkey" :item="item"
                    @click-download="onDownload(item)"></myfile-item>
                </div>
                <delfile-bar ref="delBar"
                @del-file="onDelFile"
                @select-all="selectAll"
                @manage-file="showSelectBar"
                ></delfile-bar>
                <download-panel ref="downLoadBar"></download-panel>
            </div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import MyFileItem from '../components/myfileItem.vue';
import DelFileBar from '../components/delFileBar.vue';
import DownloadPanel from '../components/downloadPanel.vue';
import {getMyTasks, delTask, } from '../api/pdf';

export default {
    name: 'myfiles',
    components: {
        'pdf-header': PdfHeader,
        'myfile-item': MyFileItem,
        'delfile-bar': DelFileBar,
        'download-panel': DownloadPanel,
    },
    data() {
        return {
            fileList: [
            ],
            currentPage: 1,
            totalNum: 0,
            pageNum: 10,
            scrollTopArr: [],
            touchYArr: [],
            isLoadingData: 0,
            uniqKey: 0,
        };
    },

    created: function() {
        this.getMyList(1);
    },
    methods: {
        onSearch() {
            // console.log(this.$refs.searchInput.value);
            let key = this.$refs.searchInput.value || '';
            if (key.length === 0) {
                return;
            }
            this.searchFile(key);
        },
        searchFile(key) {
            console.log(key);
        },
        getMyList(page = 1) {
            let _this = this;
            this.isLoadingData = 1;
            getMyTasks(page).then((res) => {
                this.currentPage = page;
                _this.listBack(res.data);
                this.isLoadingData = 0;
                // console.log(this.isLoadingData);
            }).catch(() => {
                // console.log(res);
                this.isLoadingData = 0;
                this.currentPage = page;
                // console.log(this.isLoadingData);
            });
        },
        nextPage() {
            if (this.currentPage < Math.ceil(this.totalNum / this.pageNum)) {
                this.getMyList(this.currentPage + 1);
            }
        },
        prePage() {
            if (this.currentPage > 1) {
                this.getMyList(this.currentPage - 1);
            }
        },
        listBack(data) {
            // console.log(data);
            // this.fileList = data.data.list;
            let list = data.data.list || [];
            let arr = [];
            this.totalNum = data.data.total;
            let manage = false;
            if (this.$refs.delBar) {
                manage = !!this.$refs.delBar.isShowDel;
                // console.log('ismanage', this.$refs.delBar.isShowDel);
            }
            list.forEach((item) => {
            // for (let i = 0; i <list.a)
                let obj = {
                    time: this.timeFilter(item.created_at),
                    service_type: item.service_type,
                    source_files: item.source_files,
                    target_file: item.target_file,
                    task_id: item.task_id,
                    targetExt: this.getTargetExt(item.target_file),
                    selected: 0,
                    manage: manage,
                    uniqkey: this.getUniqKey(),
                };
                arr.push(obj);
            });
            // console.log(this.fileList.length);
            this.fileList.length = 0;
            this.fileList = arr;
            // console.log('nn', this.fileList.length);
        },
        getUniqKey() {
            this.uniqKey += 1;
            return this.uniqKey;
        },
        timeFilter(time) {
            let timeObj = {
                s: 60,
                m: 3600,
                h: 3600 * 24,
                d: 3600 * 24 * 7,
            };
            timeObj;
            let timeStamp = new Date(parseInt(time, 10) * 1000);
            let mStr = this.fillZero(timeStamp.getMonth() + 1);
            let dStr = this.fillZero(timeStamp.getDate());
            let hStr = this.fillZero(timeStamp.getHours());
            let miStr = this.fillZero(timeStamp.getMinutes());
            let sStr = this.fillZero(timeStamp.getSeconds());
            let dateStr = `${timeStamp.getFullYear()}-${mStr}-${dStr}`;
            let timeStr = `${hStr}:${miStr}:${sStr}`;
            return `${dateStr} ${timeStr}`;
        },
        fillZero(num) {
            let str = '00';
            let numstr = `${num}`;
            let reg = new RegExp(`\\d{${numstr.length}}$`);
            return str.replace(reg, num);
        },
        getTargetExt(file) {
            let ext = '';
            if (file && file.filename && file.filename.indexOf('.') !== -1) {
                let arr = file.filename.split('.');
                ext = arr[arr.length - 1];
            }
            return ext;
        },
        onTouch() {
            console.log('onTouch');
            // console.log(e);
        },
        onTouchStart() {
            console.log('onTouchStart');
            // console.log(e);
        },
        onTouchEnd() {
            console.log('onTouchEnd');
            // console.log(e);
        },
        onTouchMove(e) {
            this.addScrollTop(this.$refs.List.scrollTop);
            this.addPosY(e.changedTouches[0].pageY);

            if (this.isScrollEnd() && this.isUp() && !this.isLoadingData) {
                // console.log('isUp');
                this.nextPage();
            }
            if (this.isScrollEnd() && this.isDown() && !this.isLoadingData) {
                // console.log('isDown');
                this.prePage();
            }

        },
        addScrollTop(dis) {
            this.scrollTopArr.push(dis);
            if (this.scrollTopArr.length > 3) {
                this.scrollTopArr.shift();
            }
        },
        addPosY(y) {
            this.touchYArr.push(y);
            if (this.touchYArr.length > 3) {
                this.touchYArr.shift();
            }
        },
        isScrollEnd() {
            let flag = false;
            if (this.scrollTopArr.length === 3 &&
            this.scrollTopArr[2] === this.scrollTopArr[1] &&
            this.scrollTopArr[1] === this.scrollTopArr[0]) {
                flag = true;
            }
            return flag;
        },
        isUp() {
            // 向上滑动
            let flag = false;
            if (this.touchYArr.length === 3 &&
            this.touchYArr[2] < this.touchYArr[1] &&
            this.touchYArr[1] < this.touchYArr[0]) {
                flag = true;
            }
            return flag;
        },
        isDown() {
            // 向下滑动
            let flag = false;
            if (this.touchYArr.length === 3 &&
            this.touchYArr[2] > this.touchYArr[1] &&
            this.touchYArr[1] > this.touchYArr[0]) {
                flag = true;
            }
            return flag;
        },
        selectAll() {
            // console.log('select alll');
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                // item.manage = true;
                // if (item.selected && item.task_id) {
                item.selected = 1;
            }

        },
        onDelFile() {
            // console.log('deldel file');
            let item;
            let hasDel = false;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                // item.manage = true;
                if (item.selected && item.task_id) {
                    console.log(item);
                    hasDel = true;
                    // await delTask(item.task_id);
                    this.toDelTask(item.task_id);
                }
            }
            if (hasDel) {
                this.getMyList(this.currentPage);
            }
        },
        async toDelTask(id) {
            await delTask(id);
        },
        showSelectBar() {
            // console.log('showselect bar');
            this.$refs.header.jumpDisable = 1;
            this.setListManage(true);
        },
        setListManage(manage) {
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                item.manage = !!manage;
            }
        },
        onBack() {
            // console.log('goo back');
            if (this.$refs.delBar.isShowDel === 0 && this.$refs.delBar.isShowManage === 1) {
                this.$refs.header.jumpBack();
                return;
            }
            this.$refs.delBar.isShowDel = 0;
            this.$refs.delBar.isShowManage = 1;
            this.setListManage(false);
            let manage = false;
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                item.manage = !!manage;
                item.selected = 0;
            }
        },
        onDownload(item) {
            // console.log(item);
            this.$refs.downLoadBar.isShow = 1;
            this.$refs.downLoadBar.freshList(item.source_files, item.target_file);
        },

    },
};
</script>

<template>
    <div class="download-panel" v-show="isShow">
        <div class="mask"></div>
        <div class="download-box">
            <div class="file-list">
                <div class="file-item" v-for="(item,index) in fileList" :key="index">
                    <div class="file-name">
                        <p class="short-name">{{item.shortName}}</p>
                        <p class="ext">{{item.ext}}</p>
                        </div>
                    <div class="check-box" :class="{select: item.selected}" @click="onSelect(item)">
                        <div class="select-gou" :class="{selcet: item.selected}"></div>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <div class="btn sure" @click="onDownloadFile">{{$tr('OK@@ok')}}</div>
                <div class="btn cancel" @click="cancel">{{$tr('Cancel@@cancel')}}</div>
            </div>
            <auto-download v-for="item in downloadPool" :key="item.uniqKey" :item="item"></auto-download>
            <!-- <a ref="downA" href="aaa" class="download-btn" style="display: none;"></a> -->
        </div>
    </div>
</template>

<script>
import autoDown from './autoDown.vue';

export default {
    name: 'downLoadPanel',

    componentName: 'downLoadPanel',

    components: {
        'auto-download': autoDown,
    },

    props: [
        'item',
    ],
    data() {
        return {
            isShow: 0,
            isShowDel: 0,
            fileList: [],
            uniqKey: 0,
            downloadPool: [],
            index: 0,
        };
    },
    computed: {
    },
    methods: {
        selectAll() {
            this.$emit('select-all');
        },
        showDel() {
            this.isShowManage = 0;
            this.isShowDel = 1;
            this.$emit('manage-file');
        },
        freshList(sourceFiles, targetFile) {
            let list = [];
            let arr = [...sourceFiles, ] || [];
            // arr.push(targetFile);
            arr.unshift(targetFile);
            arr.forEach((item) => {
                let obj = {
                    shortName: this.getShortName(item.filename),
                    fileName: item.filename,
                    url: item.url,
                    uniqkey: this.getUniqKey(),
                    selected: 0,
                    start: 0,
                    ext: this.getExt(item.filename),
                };
                list.push(obj);
            });
            this.index = 0;
            this.downloadPool = [];
            this.fileList = list;
        },

        getExt(nameStr) {
            let ext = '';
            let dotIndex = nameStr.lastIndexOf('.');
            if (dotIndex !== -1) {
                ext = nameStr.substring(dotIndex, nameStr.length);
            }
            ext = ext.toLowerCase();
            return ext;
        },
        getShortName(nameStr) {
            let name = '';
            let dotIndex = nameStr.lastIndexOf('.');
            name = nameStr;
            if (dotIndex !== -1) {
                name = nameStr.substring(0, dotIndex);
            }
            return name;
        },

        onSelect(item) {
            item.selected = Number(!item.selected);
            console.log('nnnnn');
            this.freshDownloadPool();

        },
        getUniqKey() {
            this.uniqKey += 1;
            return this.uniqKey;
        },
        freshDownloadPool() {
            this.downloadPool = [];
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                if (item.selected) {
                    this.downloadPool.push(item);
                }
            }
        },
        onDownloadFile() {
            setTimeout(() => {
                this.start();
            }, 200);
        },
        start() {
            let item;
            for (let i = 0; i < this.downloadPool.length; i += 1) {
                item = this.downloadPool[i];
                if (process.isIos) {
                    this.$emit('add-download', item);
                }
                item.start = 1;
            }
            this.isShow = 0;
        },
        next() {
            this.index += 1;
            if (this.index > this.downloadPool.length - 1) {
                this.isShow = 0;
                return;
            }
            this.start();
        },
        cancel() {
            this.isShow = 0;
        },
    },
};
</script>

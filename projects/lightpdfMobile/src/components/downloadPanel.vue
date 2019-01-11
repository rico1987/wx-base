<template>
    <div class="download-panel" v-show="isShow">
        <div class="mask"></div>
        <div class="download-box">
            <div class="file-list">
                <div class="file-item">
                    <div class="file-name"></div>
                    <div class="check-box" v-for="(item,index) in fileList" :key="index" :class="{select: item.selected}" @click="onSelect">
                        <div class="select-gou" :class="{selcet: item.selected}"></div>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <div class="btn sure" @click="onDownloadFile">确定</div>
                <div class="btn cancel" @click="cancel">取消</div>
            </div>
            <a ref="downA" href="aaa" class="download-btn" style="display: none;"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'downLoadPanel',

    componentName: 'downLoadPanel',

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
                    fileName: item.filename,
                    url: item.url,
                    uniqkey: this.getUniqKey(),
                    selected: 0,
                };
                list.push(obj);
            });
            this.index = 0;
            this.downloadPool = [];
            this.fileList = list;
        },
        onSelect() {
            console.log('nnnnn');
        },
        getUniqKey() {
            this.uniqKey += 1;
            return this.uniqKey;
        },
        onDownloadFile() {
            this.downloadPool = [];
            let item;
            for (let i = 0; i < this.fileList.length; i += 1) {
                item = this.fileList[i];
                if (item.selected) {
                    this.downloadPool.push(item.url);
                }
            }
            this.start();
        },
        start() {
            if (this.downloadPool.length === 0) {
                return;
            }
            let url = this.downloadPool[this.index].url;
            this.$refs.downA.href = url;
            setTimeout(() => {
                this.$refs.downA.click();
                this.next();
            }, 200);
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

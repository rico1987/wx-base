<template>
    <a class="auto-download-a" target="_blank" ref="a" :href="url" style="display: none;">
    </a>
</template>

<script>
import {nativeDownload, } from '../utils/index';

export default {
    name: 'downLoadPanel',

    componentName: 'downLoadPanel',

    props: [
        'item',
    ],
    data() {
        return {
            url: this.item.url,
            fileName: this.item.fileName,
            isShowDel: 0,
            fileList: [],
            uniqKey: 0,
            downloadPool: [],
            index: 0,
            id: -1,
        };
    },
    computed: {
        state() {
            return this.item.start;
        },
    },
    methods: {
        download() {
            console.log('---', process.isIos);
            if (process.isIos && window.account) {
                this.id = nativeDownload(this.url, this.fileName);
            } else {
                this.$refs.a.click();
            }
        },
        check() {

        },
    },
    watch: {
        state(nvalue) {
            if (nvalue) {
                // this.$refs.a.click();
                this.item.start = 0;
                this.download();
            }
        },
    },
};
</script>

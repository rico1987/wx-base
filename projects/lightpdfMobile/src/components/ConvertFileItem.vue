<template>
    <div class="convert-file-item">
        <div class="file-img" :file-type="fileData.ext"></div>
        <div class="item-file-name">{{fileData.file.name}}</div>
        <div class="right-box">
            <div class="progress-box">
                <div v-show="fileData.state == 1 || fileData.state == 2" class="progress-txt">{{fileData.progress}}%</div>
                <div class="bar-box">
                    <div class="bar" :style="{top:top}"></div>
                    <div class="state-img" :class="imgState" v-show="fileData && (fileData.state == 2 || fileData.state == 3)"></div>
                </div>
            </div>
            <div class="del-btn" @click="onDel"></div>
        </div>
        <a class="down-btn" ref="downBtn" :href="fileData.targetUrl"></a>
    </div>
</template>

<script>
import {nativeDownload, } from '../utils/index';

export default {
    name: 'ConvertFileItem',

    componentName: 'ConvertFileItem',

    props: [
        'fileData',
    ],
    data() {
        return {
            filed: this.fileData,
            top: '100%',
            imgState: '',
        };
    },
    computed: {
        progress() {
            return this.filed.progress;
        },
        url() {
            return this.filed.targetUrl;
        },
        state() {
            return this.filed.state;
        },
    },
    methods: {
        onDel: function() {
            this.$emit('del-file');
        },
        start: function() {
            // start upload file and convert
        },
    },
    watch: {
        progress(newValue, oldValue) {
            oldValue;
            let num = 100 - newValue;
            this.top = `${num}%`;
        },
        url(newValue, oldValue) {
            oldValue;
            console.log('download url update');
            if (newValue && newValue.length > 1) {
                console.log('--111---');
                // nativeDownload
                console.log(this.filed.targetUrl, this.filed.targetName);
                if (window.account) {
                    console.log(this.filed.targetUrl, this.filed.targetName);
                    nativeDownload(this.filed.targetUrl, this.filed.targetName);
                    // return;
                }
                // setTimeout(() => {
                //     _this.$refs.downBtn.click();
                // }, 200);
            }
        },
        state(newValue, oldValue) {
            oldValue;
            if (newValue === 3) {
                this.imgState = 'error';
                this.filed.progress = 0;
            } else {
                this.imgState = '';
            }
        },
    },

};
</script>

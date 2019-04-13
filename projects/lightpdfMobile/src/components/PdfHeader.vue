<template>
    <div class="pdf-header" v-bind:class="{isios: isIos}">
        <div class="header-title"><slot></slot></div>
        <div class="back-bar" @click="back"></div>
    </div>
</template>

<script>
import his from '../utils/pathHistory';
import {backToIosNative, } from '../utils/index';

export default {
    name: 'PdfHeader',

    componentName: 'PdfHeader',

    props: {
        headertype: {
            type: String,
            default: 'pdf-to-word',
        },
        disablejump: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            type: this.headertype,
            isIos: process.isIos,
            pathMap: {
                'pdf-to-word': '/home',
                'pdf-to-excel': '/home',
                'pdf-to-ppt': '/home',
                'pdf-to-png': '/home',
                'pdf-to-txt': '/home',
                'pdf-to-text': '/home',
                'word-to-pdf': '/topdf',
                'excel-to-pdf': '/topdf',
                'png-to-pdf': '/topdf',
                'jpg-to-pdf': '/topdf',
                'ppt-to-pdf': '/topdf',
                'merge-pdf': '/mergepdf',
                'my-files': '/info',
                'pay': 'info',
                'vippay': 'info',
            },
            jumpDisable: this.disablejump || 0,
            backObj: null,
        };
    },

    methods: {
        back() {
            console.log(this.$router);
            console.log(90000);
            if (this.jumpDisable) {
                console.log('jump disable');
                this.$emit('click-jump');
                return;
            }
            //  else {
            //     console.log(11111);
            //     return;
            // }
            this.jumpBack();

        },
        jumpBack() {
            console.log('jumpback');
            let path = this.getParentPath();
            let item = his.search(path);
            if (process.isIos === '1') {
                console.log('backNative---');
                backToIosNative();
                return;
            }
            if (item) {
                this.$router.push({
                    path: item.path,
                    query: item.query,
                });
            } else {
                this.$router.push({
                    path: path,
                });
            }
        },
        getParentPath() {
            let path = '/home';
            if (this.pathMap[this.type]) {
                path = this.pathMap[this.type];
            }
            return path;
        },
    },
};
</script>

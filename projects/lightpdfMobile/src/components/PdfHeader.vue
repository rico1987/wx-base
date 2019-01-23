<template>
    <div class="pdf-header">
        <div class="header-title"><slot></slot></div>
        <div class="back-bar" @click="back"></div>
    </div>
</template>

<script>
import his from '../utils/pathHistory';

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
            pathMap: {
                'pdf-to-word': '/home',
                'pdf-to-excel': '/home',
                'pdf-to-ppt': '/home',
                'pdf-to-png': '/home',
                'pdf-to-txt': '/home',
                'word-to-pdf': '/topdf',
                'excel-to-pdf': '/topdf',
                'png-to-pdf': '/topdf',
                'jpg-to-pdf': '/topdf',
                'ppt-to-pdf': '/topdf',
                'merge-pdf': '/mergepdf',
                'my-files': '/info',
            },
            jumpDisable: this.disablejump || 0,
            backObj: null,
        };
    },

    methods: {
        back() {
            console.log(this.$router);
            if (this.jumpDisable) {
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
            let path = this.getParentPath();
            let item = his.search(path);
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

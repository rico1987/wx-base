<template>
    <div class="pdf-header">
        <div class="header-title">我的文件</div>
        <div class="back-bar" @click="back"></div>
    </div>
</template>

<script>
import his from '../utils/pathHistory';

export default {
    name: 'PdfHeader',

    componentName: 'PdfHeader',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },
    data() {
        return {
            type: '',
            pathMap: {
                'pdf-to-word': '/home',
                'pdf-to-excel': '/home',
                'pdf-to-ppt': '/home',
                'pdf-to-png': '/home',
                'pdf-to-txt': '/home',
            },
        };
    },

    methods: {
        back() {
            console.log(this.$router);
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

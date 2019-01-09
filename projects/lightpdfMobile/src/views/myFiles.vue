<template>
    <div class="myfile-container">
        <div class="inner-container">
            <div class="myfile-panel">
                <pdf-header ref="header" ></pdf-header>
                <div class="search-bar">
                    <input type="text" ref="searchInput" class="search" placeholder="搜索文件">
                    <div class="search-btn" @click="onSearch"></div>
                </div>
                <div class="my-file-list">
                    <myfile-item v-for="(item,index) in fileList" :key="index" :item="item"></myfile-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import MyFileItem from '../components/myfileItem.vue';

export default {
    name: 'myfiles',
    components: {
        'pdf-header': PdfHeader,
        'myfile-item': MyFileItem,
    },
    data() {
        return {
            fileList: [
                {
                    file: {name: 'aaaaa', },
                    fileType: 'pdf',
                },
            ],
        };
    },

    created: function() {
    },
    methods: {
        onSearch() {
            console.log(this.$refs.searchInput.value);
            let key = this.$refs.searchInput.value || '';
            if (key.length === 0) {
                return;
            }
            this.searchFile(key);
        },
        searchFile(key) {
            console.log(key);
        },
    },
};
</script>

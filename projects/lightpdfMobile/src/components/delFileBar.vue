<template>
    <div class="del-file-bar">
        <div class="manager-btn" v-show="isShowManage" @click="showDel">管理文件</div>
        <div class="del-box" v-show="isShowDel">
            <div class="select-all" @click="selectAll">全选</div>
            <div class="del-btn" @click="onDel">删除</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'delFileBar',

    componentName: 'delFileBar',

    props: [
        'item',
    ],
    data() {
        return {
            isShowManage: 1,
            isShowDel: 0,
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
        },
        onDel() {
            this.$emit('del-file');
            this.isShowManage = 1;
            this.isShowDel = 0;
        },
    },
};
</script>

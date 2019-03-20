<template>
    <div class="del-file-bar">
        <div class="manager-btn" v-show="isShowManage" @click="showDel">{{$tr('Manage file(s)@@002162')}}</div>
        <div class="del-box" v-show="isShowDel">
            <div class="select-all" @click="selectAll">{{$tr('Select all@@002163')}}</div>
            <div class="del-btn" @click="onDel">{{$tr('Delete@@002072')}}</div>
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
            this.$emit('manage-file');
        },
        onDel() {
            this.$emit('del-file');
        },
    },
};
</script>

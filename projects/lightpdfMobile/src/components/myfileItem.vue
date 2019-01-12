<template>
    <div class="my-file-item">
        <div class="item-box">
            <div class="file-img" :class="fileType"></div>
            <div class="file-info">
                <div class="item-file-name">{{taskItem.target_file.filename}}</div>
                <div class="date">{{this.taskItem.time}}</div>
                <div class="size">128k</div>
            </div>
            <div class="right-box ">
                    <div class="view-btn" v-show="!manage"
                    @click="onClickDownload"
                    @touch="onClickDownload"
                    ></div>
                    <div class="check-box" v-show="manage" :class="{select: taskItem.selected}" @click="onSelect">
                        <div class="select-gou"></div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myFileItem',

    componentName: 'myFileItem',

    props: [
        'item',
    ],
    data() {
        return {
            taskItem: this.item,
            selected: 0,
            fileType: this.item.targetExt || 'pdf',
            manage: this.item.manage,
        };
    },
    computed: {
        manageState() {
            return this.taskItem.manage;
        },
    },
    methods: {
        onSelect() {
            this.taskItem.selected = !this.taskItem.selected;
        },
        onClickDownload() {
            console.log('onClickDownloadonClickDownload');
            this.$emit('click-download');
        },
    },
    watch: {
        manageState() {
            this.manage = this.taskItem.manage;
        },
    },

};
</script>

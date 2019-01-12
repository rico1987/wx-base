<template>
    <a class="auto-download-a" target="_blank" ref="a" :href="url" style="display: none;">
    </a>
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
            url: this.item.url,
            isShowDel: 0,
            fileList: [],
            uniqKey: 0,
            downloadPool: [],
            index: 0,
        };
    },
    computed: {
        state() {
            return this.item.start;
        },
    },
    methods: {
        download() {
            this.$refs.a.click();
        },
    },
    watch: {
        state(nvalue) {
            if (nvalue) {
                this.$refs.a.click();
                this.item.start = 0;
            }
        },
    },
};
</script>

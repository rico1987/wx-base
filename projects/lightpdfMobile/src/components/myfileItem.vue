<template>
    <div class="my-file-item">
        <div class="file-img" :class="fileType"></div>
        <div class="file-info">
            <div class="item-file-name">aaaa.pdf</div>
            <div class="date">2018-01-01 14:22:22</div>
            <div class="size">128k</div>
        </div>
        <div class="right-box">
            <div class="progress-box">
                <div class="view-btn"></div>
                <input class="checkbox" type="checkbox" id="jack" value="1" v-model="selected">
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
            file: this.item.file,
            selected: 0,
            fileType: 'pdf',
        };
    },
    computed: {
    },
    methods: {
        onDel: function() {
            console.log('aaa');
        },
        start: function() {
            // start upload file and convert
        },
    },
};
</script>

<template>
    <div class="convert-file-item">
        <div class="file-img"></div>
        <div class="item-file-name">{{fileData.file.name}}</div>
        <div class="right-box">
            <div class="progress-box">
                <div v-show="fileData.state == 1" class="progress-txt">{{fileData.progress}}%</div>
                <div class="bar-box">
                    <div class="bar"></div>
                    <div class="state-img"></div>
                </div>
            </div>
            <div class="del-btn" @click="onDel"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConvertFileItem',

    componentName: 'ConvertFileItem',

    props: [
        'fileData',
    ],
    data() {
        return {
            filed: this.fileData,
        };
    },
    methods: {
        onDel: function() {
            this.$emit('del-file');
        },
        start: function() {
            // start upload file and convert
        },
    },

};
</script>

<template>
    <div class="total-progress">
        <div class="blue-bar" :style="{width:width}"></div>
        <div class="progress-txt" v-show="isStep">{{index}}/{{totalNum}} {{trStr}}</div>
        <div class="progress-txt" v-show="!isStep">{{trStr}}</div>
    </div>
</template>

<script>
export default {
    name: 'TotalProgress',

    componentName: 'TotalProgress',

    props: {
        itemHeight: {
            type: String,
            default: '42px',
        },
    },
    data() {
        return {
            index: 0,
            totalNum: 0,
            trStr: 'converting',
            width: '0%',
            isStep: 1,
        };
    },

    watch: {
        index(newValue, oldValue) {
            oldValue;
            let width = 0;
            if (newValue > 0 && this.totalNum) {
                width = parseInt((this.index / this.totalNum) * 100, 10);
            }
            this.width = `${width}%`;
        },
    },
};
</script>

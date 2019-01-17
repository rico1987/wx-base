<template>
    <div class="total-progress">
        <div class="blue-bar" :style="{width:width}"></div>
        <div class="progress-txt" v-show="isStep">{{index}}/{{totalNum}} {{$tr(trStr)}}</div>
        <div class="progress-txt" v-show="!isStep">{{$tr(trStr)}}</div>
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
            trStr: 'Converting@@001840',
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

<template>
    <div class="index-container">
        <div class="inner-container">
            <div class="top-title">
                <div class="title-content">{{$tr('Merge to PDF@@002082')}}</div>
                <div class="title-des">
                    {{$tr('快速实现PDF文档合并，安全简单方便！@@')}}
                </div>
            </div>
            <div class="convert-box">
                <div class="convert-item" v-for="(item,index) in convertkey" :class="item.key" :key="index"
                @click="goConvert(item.key)">
                    <div class="img-box"><div class="img"></div></div>
                    <div class="convert-name">{{$tr(item.trkey)}}</div>
                    <div class="border-box" :class="pos(index)"></div>
                </div>
            </div>
            <main-bar type="merge-pdf"></main-bar>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';

export default {
    name: 'mergepdf',
    components: {
        'main-bar': MainBar,
    },
    data() {
        return {
            convertkey: [
                {
                    key: 'merge-pdf',
                    trkey: 'Merge to PDF@@002082',
                },
            ],
        };
    },

    created: function() {
    },
    methods: {
        pos: function(index) {
            let len = this.convertkey.length;
            let step = 3;
            let lines = Math.ceil(len / step);
            let first = 'c';
            let second = 'c';
            if (index < 3) {
                first = 't';
            } else if (index >= 3 && Math.ceil((index + 1) / step) < lines) {
                first = 'c';
            } else {
                first = 'b';
            }
            if (index % 3 === 0) {
                second = 'l';
            } else if (index % 3 === 1) {
                second = 'c';
            } else {
                second = 'r';
            }
            return `${first}${second}`;
        },
        goConvert: function(e) {
            this.$router.push({
                path: '/merge',
                query: {
                    type: e,
                    step: 1,
                },
            });
        },
    },
};
</script>

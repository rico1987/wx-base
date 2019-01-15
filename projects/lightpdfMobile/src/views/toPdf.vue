<template>
    <div class="index-container">
        <div class="inner-container">
            <div class="top-title">
                <div class="title-content">转为PDF工具</div>
                <div class="title-des">
                    {{$tr('aaa@@001193')}}
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
            <main-bar type="to-pdf"></main-bar>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';
import {getPdfSession, } from '../api/pdf';
import ls from '../utils/littleStore';
import pwdCheck from '../utils/pwdCheck';
import his from '../utils/pathHistory';

export default {
    name: 'topdf',
    components: {
        'main-bar': MainBar,
    },
    data() {
        return {
            convertkey: [
                {
                    key: 'word-to-pdf',
                    trkey: 'Word to PDF@@002096',
                },
                {
                    key: 'excel-to-pdf',
                    trkey: 'Excel to PDF@@002096',
                },
                {
                    key: 'png-to-pdf',
                    trkey: 'Png to PDF@@002096',
                },
                {
                    key: 'jpg-to-pdf',
                    trkey: 'Jpg to PDF@@002096',
                },
                {
                    key: 'ppt-to-pdf',
                    trkey: 'Ppt to PDF@@002096',
                },
            ],
        };
    },

    created: function() {
         his.push(this.$router.history.current);
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
            console.log(e);
            // console.log(this.$t('333'));
            console.log(this.$tr('aaa@@001193'));
            // this.$router.push('/convert');
            this.$router.push({
                path: '/topdfconvert',
                query: {
                    type: e,
                    step: 1,
                },
            });
        },
    },
};
</script>

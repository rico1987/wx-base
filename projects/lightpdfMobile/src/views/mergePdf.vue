<template>
    <div class="index-container">
        <div class="inner-container">
            <div class="top-title">
                <div class="title-content">{{$tr('Merge to PDF@@002082')}}</div>
                <div class="title-des">
                    {{$tr('Quickly merge multiple PDFs into one. Easy, effective and high quality!@@002052')}}
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
            <feed-back-entry></feed-back-entry>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';
import FeedBackEntry from '../components/feedBackEntry.vue';
import {getPdfSession, } from '../api/pdf';
import ls from '../utils/littleStore';
import his from '../utils/pathHistory';
import {getNativeData, } from '../utils/index';

export default {
    name: 'mergepdf',
    components: {
        'main-bar': MainBar,
        'feed-back-entry': FeedBackEntry,
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
        // console.log('this.$i18n.locale', this.$i18n.locale);
        let data = getNativeData();
        if (data && data.identity_token) {
            ls.set('identity_token', data.identity_token);
        } else {
            // console.log('clear identity_token2');
            ls.set('identity_token', '');
        }
        this.getSession();
        his.push(this.$router.history.current);
    },
    methods: {
        getSession: function() {
            // console.log('identity_token');
            // console.log(ls.get('identity_token'));
            getPdfSession().then((response) => {
                const data = response.data;
                // console.log(data);
                ls.set('api_token', data.data.user.api_token);
                // console.log('aaaa');
                this.echoit(data.data.user);
                // this.getVip();
                window.freshVip();
                // console.log(this);
            }).catch((error) => {
                console.log(error);
                if (error.error) {
                    // error tokenʧЧ
                    console.log('clear identity_token1');
                    ls.set('identity_token', '');
                    this.getSession();
                    return;
                }
                ls.set('api_token', '');
                ls.set('client-vip', 0);
            });
        },
        echoit: function(params) {
            console.log(params);
        },
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

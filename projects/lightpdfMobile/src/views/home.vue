<template>
    <div class="index-container">
        <div class="inner-container">
            <div class="top-title">
                <div class="title-content">{{$tr('Convert PDF@@001707')}}</div>
                <div class="title-des">
                    {{$tr('快速实现PDF文档转Word,Excel,PPT,JPG等格式，安全简单方便！')}}
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
            <main-bar type="from-pdf"></main-bar>
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
    name: 'home',
    components: {
        'main-bar': MainBar,
    },
    data() {
        return {
            convertkey: [
                {
                    key: 'pdf-to-word',
                    trkey: 'PDF to Word@@002074',
                },
                {
                    key: 'pdf-to-excel',
                    trkey: 'PDF to Excel@@001819',
                },
                {
                    key: 'pdf-to-ppt',
                    trkey: 'PDF to Ppt@@002075',
                },
                {
                    key: 'pdf-to-jpg',
                    trkey: 'PDF to Jpg@@001820',
                },
                {
                    key: 'pdf-to-png',
                    trkey: 'PDF to Png@@001821',
                },
                {
                    key: 'pdf-to-txt',
                    trkey: 'PDF to Text@@001823',
                },
            ],
            pwdCheckObj: null,
        };
    },

    created: function() {
        if (window.uinfo && window.uinfo.identity_token) {
            ls.set('identity_token', window.uinfo.identity_token);
        }
        this.getSession();
        this.pwdCheckObj = pwdCheck.create();
        this.pwdCheckObj.on('pdf-ok', this.pwdOk);
        console.log(this.$router);
        console.log(this.$router.history.current);
        his.push(this.$router.history.current);
    },
    methods: {
        pwdOk(data) {
            console.log('iiindex');
            console.log(data);
        },
        getSession: function() {
            getPdfSession().then((response) => {
                const data = response.data;
                console.log(data);
                ls.set('api_token', data.data.user.api_token);
                console.log('aaaa');
                this.echoit(data.data.user);
                console.log(this);
            }).catch((error) => {
                console.log(error);
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
                path: '/frompdf',
                query: {
                    type: e,
                    step: 1,
                },
            });
        },
    },
};
</script>

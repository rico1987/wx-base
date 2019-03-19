<template>
    <div class="index-container">
        <div class="inner-container">
            <div class="top-title">
                <div class="title-content">{{$tr('Convert PDF@@001707')}}</div>
                <div class="title-des">
                    {{$tr('Quickly convert PDF to other formats. Easy, effective and high quality!@@002050')}}
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
            <feed-back-entry></feed-back-entry>
        </div>
    </div>

</template>

<script>
import MainBar from '../components/MainBar.vue';
import FeedBackEntry from '../components/feedBackEntry.vue';
import {getPdfSession, } from '../api/pdf';
import ls from '../utils/littleStore';
import pwdCheck from '../utils/pwdCheck';
import his from '../utils/pathHistory';
import {getNativeData, saveNativeData, } from '../utils/index';
import {getPdfConverterVipInfo, } from '../api/support';

export default {
    name: 'home',
    components: {
        'main-bar': MainBar,
        'feed-back-entry': FeedBackEntry,
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
                    key: 'pdf-to-text',
                    trkey: 'PDF to Text@@001823',
                },
            ],
            pwdCheckObj: null,
        };
    },

    created: function() {
        // console.log('this.$i18n.locale', this.$i18n.locale);
        let data = getNativeData();
        if (data && data.identity_token) {
        // if (1) {
            ls.set('identity_token', data.identity_token);
            // ls.set('identity_token', '4816931,1548054256,a17570d2e8d3b0ae152714007493fd52');
            // ls.set('identity_token', '3106030,1548139771,aca1ea964fda6e6555381f541e253878');
            // ls.set('identity_token', '4816931,1548054256,a17570d2e8d3b0ae152714007493fd52');
            // ls.set('identity_token', '1968363,1548247249,acf478799959c26160bd5e5bc521fd55');
        } else {
            // console.log('clear identity_token2');
            ls.set('identity_token', '');
        }
        this.getSession();
        this.pwdCheckObj = pwdCheck.create();
        this.pwdCheckObj.on('pdf-ok', this.pwdOk);
        his.push(this.$router.history.current);
        console.log(process.isIos);
    },
    methods: {
        pwdOk() {
            console.log('iiindex');
            // console.log(data);
        },
        getSession: function() {
            // console.log('identity_token');
            // console.log(ls.get('identity_token'));
            getPdfSession().then((response) => {
                const data = response.data;
                // console.log(data);
                let saveData = getNativeData();
                saveData['pdf_api_token'] = data.data.user.api_token;
                saveNativeData(saveData);
                ls.set('api_token', data.data.user.api_token);
                // console.log('aaaa');
                this.echoit(data.data.user);
                // this.getVip();
                window.freshVip();
                // console.log(this);
            }).catch((error) => {
                console.log(error);
                if (error.error) {
                    // error token失效
                    // console.log('clear identity_token1');
                    ls.set('identity_token', '');
                    this.getSession();
                    return;
                }
                let saveData = getNativeData();
                saveData['pdf_api_token'] = '';
                saveNativeData(saveData);
                ls.set('api_token', '');
                ls.set('client-vip', 0);
            });
        },
        echoit: function(params) {
            console.log(params);
        },
        getVip() {
            getPdfConverterVipInfo().then((response) => {
                const data = response.data;
                if (data.data.license_info && data.data.user_info && data.data.license_info.is_activated === 1) {
                    ls.set('client-vip', 1);
                    ls.set('client-vip-express-day', data.data.license_info.expire_date);
                } else {
                    ls.set('client-vip', 0);
                }
            }).catch((error) => {
                error;
                ls.set('client-vip', 0);
            });

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

<template>
    <div class="convert-result-container">
        <div class="inner-container">
            <pdf-header ref="header" :disablejump="1" :type="taskName"
            @click-jump="back"
            >{{headerTitle}}</pdf-header>
            <div class="convert-result-panel">
                <div class="result-img-box">
                    <div class="img-box">
                        <div class="folder-img"></div>
                        <div class="lamp-img"></div>
                    </div>

                    <p class="vip-des" v-show="isVip == 0">{{$tr('VIP members can convert without any limitations@@002158')}}</p>
                    <p class="normal-des" v-show="isVip == 0">{{$tr('You can only convert the very first 5 pages since you are not VIP member yet!@@002159')}}</p>
                    <p class="vip-des">{{numStr}}</p>
                </div>
                <div class="btn-box">
                    <div v-show="isVip == 0" class="join-vip" @click="joinVip">{{$tr('Join VIP@@002145')}}</div>
                    <div v-show="isOpenShow" class="open-folder"
                    @click="openPDFFolder"
                    >{{$tr('View document@@002049')}}</div>
                </div>
            </div>
            <message ref="msg"></message>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import Message from '../components/Message.vue';
// import {createTask, getTaskInfo, } from '../api/pdf';
// import TimeManager from '../utils/timeManager';
import his from '../utils/pathHistory';
import resultData from '../utils/convertResult';
import {getNativeData, jump, openFolder, } from '../utils/index';
import ls from '../utils/littleStore';

export default {
    name: 'convertResult',
    components: {
        'pdf-header': PdfHeader,
        'message': Message,
    },
    data() {
        return {
            isVipBtnShwo: true,
            isOpenShow: true,
            currentFile: null,
            fileList: [],
            index: 0,
            pwdCheckObj: null,
            taskName: 'pdf-to-word',
            format: '',
            infoTimerId: -1,
            infoTime: 0,
            isConverting: false,
            isStop: 0,
            type: 'pdf-to-word',
            headerTitle: '',
            isVip: 0,
            numStr: '',
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
                {
                    key: 'word-to-pdf',
                    trkey: 'Word to PDF@@002096',
                },
                {
                    key: 'excel-to-pdf',
                    trkey: 'Excel to PDF@@002079',
                },
                {
                    key: 'png-to-pdf',
                    trkey: 'Png to PDF@@002015',
                },
                {
                    key: 'jpg-to-pdf',
                    trkey: 'Jpg to PDF@@002014',
                },
                {
                    key: 'ppt-to-pdf',
                    trkey: 'Ppt to PDF@@002080',
                },
                {
                    key: 'merge-pdf',
                    trkey: 'Merge to PDF@@002082',
                },
            ],
            backRtMap: {
                'pdf-to-word': '/frompdf',
                'pdf-to-excel': '/frompdf',
                'pdf-to-ppt': '/frompdf',
                'pdf-to-jpg': '/frompdf',
                'pdf-to-png': '/frompdf',
                'pdf-to-txt': '/frompdf',
                'pdf-to-text': '/frompdf',
                'word-to-pdf': '/topdfconvert',
                'excel-to-pdf': '/topdfconvert',
                'png-to-pdf': '/topdfconvert',
                'jpg-to-pdf': '/topdfconvert',
                'ppt-to-pdf': '/topdfconvert',
                'merge-pdf': '/merge',
            },
        };
    },

    created: function() {
        his.push(this.$router.history.current);
        this.fileList = resultData.targetList;
        // console.log(this.fileList);
        this.numStr = this.$tr('{0} file(s) converted successfully@@002157', this.fileList.length);
        if (this.$route.query.type) {
            let type = this.$route.query.type;
            this.type = type;
        }
        this.initTitle();
        let saveData = getNativeData();
        this.isVip = saveData['client-vip'] || ls.get('client-vip') || 0;
        // console.log('isvip', this.isVip);
    },
    methods: {
        getConvertKey(key) {
            let item;
            for (let i = 0; i < this.convertkey.length; i += 1) {
                item = this.convertkey[i];
                if (item.key === key) {
                    this.headerTitle = this.$tr(item.trkey);
                    break;
                }
            }
        },
        initTitle() {
            let item = this.getConvertKey(this.type);
            if (item) {
                this.headerTitle = this.$tr(item.trkey);
            }
        },
        back() {
            let rt = this.backRtMap[this.type];
            if (rt) {
                this.$router.push({
                    path: rt,
                    query: {
                        type: this.type,
                    },
                });
            }
        },
        joinVip() {
            // let obj = {
            //     project: 'lightpdf',
            //     router: '/pay',
            //     query: {
            //         lang: 'zh',
            //         type: 'pdf-to-word',
            //         step: 1,
            //     },
            // }
            let data = getNativeData();
            if (data && data.identity_token) {
                this.$router.push({
                    path: '/pay',
                });
            } else {
                let params = {};
                let obj = {
                    project: 'lightpdf',
                    router: '/pay',
                    query: {
                        lang: this.$i18n.locale,
                    },
                };
                params.backobj = encodeURIComponent(JSON.stringify(obj));
                jump('lightpdf', 'account', '/login', params);
            }

        },
        openPDFFolder() {
            openFolder();
        },
    },
};
</script>

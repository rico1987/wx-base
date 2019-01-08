<template>
    <div class="convert-result-container">
        <div class="inner-container">
            <pdf-header ref="header" :type="taskName"></pdf-header>
            <div class="convert-result-panel">
                <div class="result-img-box">
                    <div class="img-box">
                        <div class="folder-img"></div>
                        <div class="lamp-img"></div>
                    </div>
                    <p class="vip-des">会员可无限制转换</p>
                    <p class="normal-des">由于未开通会员，只能享受前5页转换</p>
                </div>
                <div class="btn-box">
                    <div v-show="isVipBtnShwo" class="join-vip" @click="joinVip">开通会员</div>
                    <div v-show="isOpenShow" class="open-folder"
                    @click="openFolder"
                    >查看文档</div>
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
        };
    },

    created: function() {
        his.push(this.$router.history.current);
        this.fileList = resultData.targetList;
        console.log(this.fileList);
    },
    methods: {
        joinVip() {

        },
        openFolder() {

        },
    },
};
</script>

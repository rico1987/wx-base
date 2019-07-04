<template>
    <div class="about-container">
        <div class="inner-container">
            <pdf-header ref="header" :headertype="type">{{headerTitle}}</pdf-header>
            <div class="logo-box">
                <div class="logo"></div>
            </div>
            <div class="app-name" ref="txtEl">{{appName}} {{version}}</div>
            <div class="app-verson" ref="versionEl" ></div>
            <div class="app-update" v-if="isAuto" ref="updateEl" @click="goCheckUpdate">{{updateStr}}</div>
            <div class="app-copyright" ref="copyrightEl" v-html="cpRight">
            </div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import {getAppInfo, onCheckUpdate, } from '../utils/index';
// import {getPdfConverterVipInfo, } from '../api/support';
// import ls from '../utils/littleStore';

export default {
    name: 'About',
    components: {
        'pdf-header': PdfHeader,
    },
    data() {
        return {
            type: 'about',
            headerTitle: '',
            titleTrkey: 'About@@001851',
            appName: 'PDF Converter',
            version: '',
            cpRight: '',
            cpRightTrKey: 'copy right@@001855',
            updateStr: '',
            updateTrKey: 'update@@001849',
            isAuto: 0,
        };
    },

    created: function() {
        this.setTitleStr();
    },
    methods: {
        setTitleStr() {
            this.headerTitle = this.$tr(this.titleTrkey);
            this.cpRight = this.$tr(this.cpRightTrKey);
            this.updateStr = this.$tr(this.updateTrKey);
            let info = getAppInfo();
            if (info['appName']) {
                this.appName = info['appName'];
            }
            if (info['version']) {
                this.version = info['version'];
            }
            if (info['appChannel'] === 'huawei') {
                this.cpRight = 'Copyright © 2019 深圳市网旭科技有限公司 版权所有<br>客服联系方式：0755-36552267（9:00-22:00）';
            }
        },
        goCheckUpdate() {
            onCheckUpdate();
        },
        getVipInfo() {
            // vip.getVip(this.dealLicenseInfo);
        },
    },
};
</script>

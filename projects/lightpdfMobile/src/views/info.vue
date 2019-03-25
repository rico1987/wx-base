<template>
    <div class="info-container">
        <div class="inner-container">
            <div class="info-top-bg"></div>
                <div class="info-box">
                    <div class="user-info" v-if="isLogin">
                        <div class="avatar">
                            <img v-show="info && avatar" :src="avatar">
                        </div>
                        <div class="user-name">{{nickname}}</div>
                        <div class="expire-day"
                        v-show="licenseInfo.isVip"
                        >
                            {{$tr('001685',licenseInfo.expire_date)}}
                        </div>
                    </div>
                    <div class="user-info isguest" v-else-if="!isLogin">
                        <div class="avatar">
                            <img v-show="info && avatar" :src="avatar">
                        </div>
                        <div class="user-login-btn btn active" @click="toLogin">{{$tr('Login@@002161')}}</div>
                    </div>
                    <div class="btn active" @click="goPayCenter">{{$tr('Recharge centre@@002033')}}</div>
                    <div class="btn" @click="goMyfiles">{{$tr('Network files@@002164')}}</div>
                    <div class="btn" @click="goLocalFile">{{$tr('Local files@@002165')}}</div>
                    <div class="btn" @click="goMyCenter">{{$tr('Account@@002053')}}</div>
                    <div class="btn" @click="goCommunity">{{$tr('Forum@@002032')}}</div>
                    <div class="btn" @click="goAbout">{{$tr('About@@001851')}}</div>
            </div>
            <div class="btn logout-btn" v-if="isLogin" @click="logout">{{$tr('Logout@@002034')}}</div>
            <main-bar v-if="!isIos" type="user-center"></main-bar>
            <ios-pay-result ref="payResult" @vip-info-update="dealLicenseInfo($event)"></ios-pay-result>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';
import {nativeLogout, getNativeData, saveNativeData, jump, openUrl, openFolder, } from '../utils/index';
import convert from '../utils/convert';
// import {getPdfConverterVipInfo, } from '../api/support';
import ls from '../utils/littleStore';
import vip from '../utils/vipInfo';
import IosPayResult from '../components/IosPayResult.vue';
import price from '../utils/iosPrice';

export default {
    name: 'info',
    components: {
        'main-bar': MainBar,
        'ios-pay-result': IosPayResult,
    },
    data() {
        return {
            info: {},
            isIos: process.isIos,
            userInfo: {
                // avatar: 'https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882',
            },
            vip: null,
            licenseInfo: {
                isVip: 0,
            },
            avatar: '',
            nickname: '',
            isLogin: 0,
            showResult: 0,
        };
    },

    created: function() {
        console.log('price.state', price.state);
        this.freshUserData();
        // this.info = getNativeData();
        // this.info = window.uinfo;
        console.log('isIos===1', process.isIos, process.isIos === 1, process.isIos === '1');
        if (!window.freshInfo) {
            window.freshInfo = this.getSessionAndVip;
        }
        this.getSessionAndVip();
        window.autoCheckVipState = this.autoCheckVipState;
        // this.autoCheckVipState();
        window.iinfo = this;
    },
    methods: {
        freshUserData() {
            let data = getNativeData();
            console.log(data.userInfo);
            if (data.userInfo) {
                console.log('data----getnativedata');
                // console.log(data.userInfo);
                this.info = data.userInfo;
                this.userInfo = this.info;
                this.avatar = this.info.avatar;
                this.nickname = this.info.nickname;
                this.isLogin = 1;
            } else {
                this.info = {};
                this.userInfo = {};
                this.avatar = '';
                this.nickname = '';
                this.isLogin = 0;
            }
        },
        logined() {
            if (!process.isIos) {
                return true;
            }
            let saveData = getNativeData();
            if (saveData['userInfo'] && saveData['identity_token']) {
                return true;
            }
            return false;
        },
        showStoreVipInfo() {
            if (ls.get('client-vip') === '1' && vip.licenseInfo) {
                this.licenseInfo.isVip = 1;
                this.licenseInfo.expire_date = this.shortTime(vip.licenseInfo.expire_date);
            }
        },
        getVipInfo() {
            console.log(this.$route);
            console.log(this.$router);
            console.log('--------');
            if (this.$route.path !== '/info') {
                console.log('rettun');
                return;
            }
            vip.getVip(this.dealLicenseInfo);
        },
        dealLicenseInfo(data) {
            console.log('dealLicenseInfo');
            console.log(data);
            let arr = [];
            if (data) {
                // this.licenseInfo = data;
                arr = Object.keys(data);
                if (data.expire_date) {
                    data.expire_date = this.shortTime(data.expire_date);
                }
                if (data.passport_license_type === 'lifetime') {
                    data.expire_date = this.$tr('Lifetime@@001670');
                }
                for (let i = 0;i < arr.length; i += 1) {
                    this.licenseInfo[arr[i]] = data[arr[i]];
                }
                this.licenseInfo.isVip = data.isVip;
                console.log('----isvip', this.licenseInfo.isVip);
                // this.isLogin = 1;
            } else {
                // this.licenseInfo = {};
                arr = Object.keys(this.licenseInfo);
                for (let i = 0;i < this.licenseInfo.length; i += 1) {
                    this.licenseInfo[arr[i]] = null;
                }
                // this.isLogin = 0;
            }
            console.log('licenseInfo');
            console.log(this.licenseInfo);
        },
        dealVipInfo(data) {
            if (!data) {
                return;
            }
            // console.log(data);
            // console.log(data.is_activated);
            let saveData = getNativeData();
            
            if (data.is_activated === '1') {
                data.isVip = 1;
                ls.set('client-vip', '1');
                saveData['client-vip'] = '1';
                saveNativeData(saveData);
                ls.set('client-vip-express-day', data.expire_date);
                vip.licenseInfo = data;
            } else {
                data.isVip = 0;
                ls.set('client-vip', 0);
                saveData['client-vip'] = '0';
                saveNativeData(saveData);
                vip.licenseInfo = null;
            }
            if (data.expire_date) {
                data.expire_date = this.shortTime(data.expire_date);
            }
            // yearly
            if (data.passport_license_type === 'lifetime') {
                data.expire_date = this.$tr('Lifetime@@001670');
            }
        },
        shortTime(time) {
            if (!time) {
                return '';
            }
            let machArr = time.match(/\d{4}-\d{2}-\d{2}/);
            if (machArr) {
                return machArr[0];
            }
            return time;
        },
        goMyfiles() {
            if (!this.logined()) {
                this.toLogin();
                return;
            }
            this.$router.push({
                path: '/myfiles',
            });
        },
        goLocalFile() {
            openFolder();
        },
        goPayCenter() {
            if (!this.logined()) {
                this.toLogin();
                return;
            }
            if (this.licenseInfo && this.licenseInfo.isVip) {
                this.$router.push({
                    path: '/vippay',
                });
            } else {
                this.$router.push({
                    path: '/pay',
                });
            }
        },
        goMyCenter() {
            let params = {};
            let obj = {
                project: 'lightpdf',
                router: '/info',
                query: {
                    lang: this.$i18n.locale,
                },
            };
            params.backobj = encodeURIComponent(JSON.stringify(obj));
            jump('lightpdf', 'account', '/account-menu', params);
        },
        logout() {
            ls.set('api_token', '');
            ls.set('identity_token', '');
            nativeLogout();
            setTimeout(() => {
                jump('lightpdf', 'lightpdf', '/home', {
                    lang: this.$i18n.locale,
                });
            }, 200);
        },
        toLogin() {
            let params = {};
            let obj = {
                project: 'lightpdf',
                router: '/info',
                query: {
                    lang: this.$i18n.locale,
                },
            };
            params.backobj = encodeURIComponent(JSON.stringify(obj));
            jump('lightpdf', 'account', '/login', params);
        },
        goCommunity() {
            if (window.account) {
                openUrl(this.getUrl());
            } else {
                window.open(this.getUrl());
            }
        },
        goAbout() {
            this.$router.push({
                path: '/about',
            });
            // if (window.account && window.account.onWebJump) {
            //     jump('lightpdf', 'lightpdf', '/about', {
            //         lang: this.$i18n.locale,
            //     });
            // } else {
            //     this.$router.push({
            //         path: '/about',
            //     });
            // }
        },
        getUrl() {
            if (this.$i18n.locale === 'cn') {
                return 'https://www.apowersoft.cn/community/';
            } else {
                return 'https://www.apowersoft.com/community/';
            }
        },
        autoCheckVipState() {
            this.showResult = 1;
            let _this = this;
            setTimeout(() => {
                console.log(_this.$refs);
                console.log(_this.$refs.payResult);
                console.log(33333);
                _this.$refs.payResult.show();
                _this.$refs.payResult.checkVip();
            }, 300);
            // payResult
        },
        getSessionAndVip() {
            let data = getNativeData();
            // console.log('data----getnativedata');
            console.log(data.userInfo);
            if (data.userInfo) {
                console.log('data----getnativedata');
                // console.log(data.userInfo);
                this.info = data.userInfo;
                this.userInfo = this.info;
                this.avatar = this.info.avatar;
                this.nickname = this.info.nickname;
                this.isLogin = 1;
            }
            let saveData = data;
            let pdfSession = saveData['pdf_api_token'] || ls.get('api_token') || '';
            if (pdfSession !== '') {
                saveData['pdf_api_token'] = pdfSession;
                saveNativeData(saveData);
                ls.set('api_token', pdfSession);
            }
            if (convert.isAccountLogin(saveData['identity_token']) && !convert.isLightPdfLogin(pdfSession)) {
                this.getNewSession();
            }
            if (saveData['api_token'] && pdfSession !== '' && (saveData['api_token'].startsWith('-') !== pdfSession.startsWith('-'))) {
                // 已登录
                // convert.getSession().then((response) => {
                //     console.log('sesson pdf back', response);
                //     this.showStoreVipInfo();
                //     this.getVipInfo();
                // }).catch((error) => {
                //     console.log('error', error);
                // });
                this.getNewSession();
            }
            if (pdfSession !== '' && saveData['api_token']) {
                saveNativeData(saveData);
                ls.set('api_token', pdfSession);
                this.showStoreVipInfo();
                this.getVipInfo();
            } else {
                this.getNewSession();
            }
        },
        getNewSession() {
            convert.getSession().then((response) => {
                console.log('sesson pdf back', response);
                this.showStoreVipInfo();
                this.getVipInfo();
            }).catch((error) => {
                console.log('error', error);
            });
        },
    },
};
</script>

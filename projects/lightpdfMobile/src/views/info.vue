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
                    <div class="btn" @click="goMyfiles">{{$tr('My Files@@001432')}}</div>
                    <div class="btn" @click="goLocalFile">{{$tr('My Local Files')}}</div>
                    <div class="btn" @click="goMyCenter">{{$tr('Account@@002053')}}</div>
                    <div class="btn" @click="goCommunity">{{$tr('Forum@@002032')}}</div>
                    <div class="btn" @click="goAbout">{{$tr('About@@001851')}}</div>
            </div>
            <div class="btn logout-btn" v-if="isLogin" @click="logout">{{$tr('Logout@@002034')}}</div>
            <main-bar v-if="!isIos" type="user-center"></main-bar>
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

export default {
    name: 'info',
    components: {
        'main-bar': MainBar,
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
            },
            avatar: '',
            nickname: '',
            isLogin: 0,
        };
    },

    created: function() {
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
        // this.info = getNativeData();
        // this.info = window.uinfo;
        console.log('isIos===1', process.isIos, process.isIos === 1, process.isIos === '1');
        let saveData = getNativeData();
        let pdfSession = saveData['pdf_api_token'] || ls.get('api_token') || '';
        if (pdfSession !== '') {
            saveNativeData(saveData);
            ls.set('api_token', pdfSession);
            this.showStoreVipInfo();
            this.getVipInfo();
        } else {
            convert.getSession().then((response) => {
                console.log('sesson pdf back', response);
                this.showStoreVipInfo();
                this.getVipInfo();
            }).catch((error) => {
                console.log('error', error);
            });
        }
    },
    methods: {
        showStoreVipInfo() {
            if (ls.get('client-vip') === '1' && vip.licenseInfo) {
                this.licenseInfo.isVip = 1;
                this.licenseInfo.expire_date = this.shortTime(vip.licenseInfo.expire_date);
            }
        },
        getVipInfo() {
            vip.getVip(this.dealLicenseInfo);
        },
        dealLicenseInfo(data) {
            // console.log('dealLicenseInfo');
            // console.log(data);
            if (data) {
                this.licenseInfo = data;
                if (data.expire_date) {
                    data.expire_date = this.shortTime(data.expire_date);
                }
                if (data.passport_license_type === 'lifetime') {
                    data.expire_date = this.$tr('Lifetime@@001670');
                }
            } else {
                this.licenseInfo = {};
            }
        },
        dealVipInfo(data) {
            if (!data) {
                return;
            }
            // console.log(data);
            // console.log(data.is_activated);
            if (data.is_activated === '1') {
                data.isVip = 1;
                ls.set('client-vip', 1);
                ls.set('client-vip-express-day', data.expire_date);
                vip.licenseInfo = data;
            } else {
                data.isVip = 0;
                ls.set('client-vip', 0);
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
            this.$router.push({
                path: '/myfiles',
            });
        },
        goLocalFile() {
            openFolder();
        },
        goPayCenter() {
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
    },
};
</script>

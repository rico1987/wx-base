<template>
    <div class="info-container">
        <div class="inner-container">
            <div class="info-top-bg"></div>
                <div class="info-box">
                    <div class="user-info">
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
                    <div class="btn active" @click="goPayCenter">{{$tr('Recharge centre@@002033')}}</div>
                    <div class="btn" @click="goMyfiles">{{$tr('My Files@@001432')}}</div>
                    <div class="btn" @click="goMyCenter">{{$tr('Account@@002053')}}</div>
                    <div class="btn" @click="goCommunity">{{$tr('Forum@@002032')}}</div>
            </div>
            <div class="btn logout-btn" @click="logout">{{$tr('Logout@@002034')}}</div>
            <main-bar type="user-center"></main-bar>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';
import {nativeLogout, getNativeData, jump, openUrl, } from '../utils/index';
import {getPdfConverterVipInfo, } from '../api/support';
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
            userInfo: {
                // avatar: 'https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882',
            },
            vip: null,
            licenseInfo: {
            },
            avatar: '',
            nickname: '',
        };
    },

    created: function() {
        let data = getNativeData();
        console.log('data----getnativedata');
        console.log(data.userInfo);
        if (data.userInfo) {
            console.log('data----getnativedata');
            console.log(data.userInfo);
            this.info = data.userInfo;
            this.userInfo = this.info;
            this.avatar = this.info.avatar;
            this.nickname = this.info.nickname;
        }
        // this.info = getNativeData();
        // this.info = window.uinfo;
        this.showStoreVipInfo();
        this.getVipInfo();
    },
    methods: {
        showStoreVipInfo() {
            if (ls.get('client-vip') === '1' && vip.licenseInfo) {
                this.licenseInfo.isVip = 1;
                this.licenseInfo.expire_date = this.shortTime(vip.licenseInfo.expire_date);
            }
        },
        getVipInfo() {
            // getPdfConverterVipInfo().then((response) => {
            //     console.log('-0-0-0-0-0-0-0');
            //     const data = response.data;
            //     if (data.data.error_code) {
            //         this.licenseInfo = {};
            //         ls.set('client-vip', 0);
            //         vip.licenseInfo = null;
            //     } else {
            //         this.licenseInfo = data.data.license_info;
            //     }
            //     this.dealVipInfo(this.licenseInfo);
            // }).catch((error) => {
            //     this.vip = null;
            //     this.license_info = null;
            //     console.log(error);
            // });
            vip.getVip(this.dealLicenseInfo);
        },
        dealLicenseInfo(data) {
            console.log('dealLicenseInfo');
            console.log(data);
            
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
            console.log(data);
            console.log(data.is_activated);
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
            nativeLogout();
            setTimeout(() => {
                jump('lightpdf', 'lightpdf', '/home', {
                    lang: this.$i18n.locale,
                });
            }, 200);
        },
        goCommunity() {
            if (window.account) {
                openUrl(this.getUrl());
            } else {
                window.open(this.getUrl());
            }
        },
        getUrl() {
            if (this.$i18n.local === 'cn') {
                return 'https://www.apowersoft.cn/community/';
            } else {
                return 'https://www.apowersoft.com/community/';
            }
        },
    },
};
</script>

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
                    <div class="btn" @click="goMyCenter">{{$tr('Account')}}</div>
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
        this.getVipInfo();
    },
    methods: {
        getVipInfo() {
            getPdfConverterVipInfo().then((response) => {
                console.log('-0-0-0-0-0-0-0');
                const data = response.data;
                // debugger;
                if (data.data.error_code) {
                    this.licenseInfo = {};
                    ls.set('client-vip', 0);
                } else {
                    this.licenseInfo = data.data.license_info;
                }
                // expire_date
                this.dealVipInfo(this.licenseInfo);
                // expire_date
                // passport_license_type monthly
                console.log(data);
            }).catch((error) => {
                this.vip = null;
                this.license_info = null;
                console.log(error);
            });
        },
        dealVipInfo(vip) {
            if (!vip) {
                return;
            }
            console.log(vip);
            console.log(vip.is_activated);
            if (vip.is_activated === '1') {
                vip.isVip = 1;
                ls.set('client-vip', 1);
            } else {
                vip.isVip = 0;
                ls.set('client-vip', 0);
            }
            if (vip.expire_date) {
                let machArr = vip.expire_date.match(/\d{4}-\d{2}-\d{2}/);
                if (machArr) {
                    vip.expire_date = machArr[0];
                }
            }
            // yearly
            if (vip.passport_license_type === 'lifetime') {
                vip.expire_date = this.$tr('Lifetime@@001670');
            }
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
            jump('lightpdf', 'account', '/account-menu');
        },
        logout() {
            nativeLogout();
            setTimeout(() => {
                jump('lightpdf', 'lightpdf', '/home');
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

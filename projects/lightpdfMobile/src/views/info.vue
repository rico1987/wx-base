<template>
    <div class="info-container">
        <div class="inner-container">
            <div class="info-top-bg"></div>
                <div class="info-box">
                    <div class="user-info">
                        <div class="avatar">
                            <img v-show="info && info.userInfo && info.userInfo.avatar" :src="info.userInfo.avatar">
                        </div>
                        <div class="user-name">{{info.userInfo.nickname}}</div>
                        <div class="expire-day"
                        v-show="licenseInfo.isVip"
                        >
                            {{$tr('001685',licenseInfo.expire_date)}}
                        </div>
                    </div>
                    <div class="btn active" @click="goPayCenter">充值中心</div>
                    <div class="btn" @click="goMyfiles">我的文件</div>
                    <div class="btn" @click="goMyCenter">用户中心</div>
                    <div class="btn">社区</div>
            </div>
            <div class="btn logout-btn" @click="logout">退出登录</div>
            <main-bar type="user-center"></main-bar>
        </div>
    </div>
</template>

<script>
import MainBar from '../components/MainBar.vue';
import {getVip, } from '../api/pdf';
import {nativeLogout, getNativeData, jump, } from '../utils/index';
import {getPdfConverterVipInfo, } from '../api/support';

export default {
    name: 'info',
    components: {
        'main-bar': MainBar,
    },
    data() {
        return {
            info: null,
            userInfo: {
                // avatar: 'https://avatar.aoscdn.com/7b46fcfb791623c2e28a94eb1e9f098e.jpg!256?t=1536391882',
            },
            vip: null,
            licenseInfo: {
            },
        };
    },

    created: function() {
        this.info = getNativeData();
        this.info = window.uinfo;
        this.getVipInfo();
    },
    methods: {
        getVipInfo() {
            getPdfConverterVipInfo().then((response) => {
                console.log('-0-0-0-0-0-0-0');
                const data = response.data;
                // debugger;
                if (data.data.error_code) {
                    this.licenseInfo ={};
                } else {
                    this.licenseInfo = data.data.license_info;
                }
                //expire_date
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
            } else {
                vip.isVip = 0;
            }
        },
        goMyfiles() {
            this.$router.push({
                path: '/myfiles',
            });
        },
        goPayCenter() {
            if (this.vip && this.vip.is_vip) {
                this.$router.push({
                    path: '/pay',
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
    },
};
</script>

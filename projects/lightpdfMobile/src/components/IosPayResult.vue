<template>
    <div class="pdf-result" v-show="visible">
        <div class="pdf-result__mask"></div>
        <div class="pdf-result__wrapper">
            <div class="panel">
                <p class="pdf-result__title"></p>
                <div class="tip-box" v-show="!isChecking && !noChange">
                    <p>{{$tr('Please don’t close this window before the payment done@@002136')}}</p>
                    <p>{{$tr('Once the order is made, click the button below as per your need@@002137')}}</p>
                </div>
                <div class="check-status-box" v-show="isChecking">
                    <div class="bg-box">
                        <p class="seconds">{{secondStr}}</p>
                    </div>
                    <p class="wait-txt">{{$tr('Searching...@@002138')}}</p>
                </div>
                <div class="no-update" v-show="noChange" ref="noUpdateTip">
                    <p class="wait-txt">{{$tr('Sorry, we have not found your payment information!@@002139')}}</p>
                </div>
                <div class="btn-box" v-show="!isChecking && !noChange">
                    <div class="type-btn" ref="payOkBtn" @click="checkVip">{{$tr('Finished@@002140')}}</div>
                    <div class="type-btn repay" ref="rePayBtn" @click="toRepay">{{$tr('Repay@@002142')}}</div>
                </div>
                <div class="btn-box" v-show="noChange">
                    <div class="type-btn" ref="reCheckBtn" @click="checkVip">{{$tr('Requery@@002141')}}</div>
                    <div class="type-btn repay" ref="rePayBtn" @click="toRepay">{{$tr('Repay@@002142')}}</div>
                </div>
            </div>
            <div class="close-btn" @click="close"></div>
        </div>
    </div>
</template>

<script>
import ls from '../utils/littleStore';
import vip from '../utils/vipInfo';
// import {getPdfConverterVipInfo, } from '../api/support';
import TimeManager from '../utils/timeManager';
import {openUrl, } from '../utils/index';

export default {
    name: 'IosPayResult',

    componentName: 'IosPayResult',

    props: {
    },

    data() {
        return {
            visible: false,
            timeout: null,
            second: 60,
            secondStr: '60S',
            vipState: '',
            isChecking: 0,
            noChange: 0,
            maxTime: 60,
            infoTime: 0,
            infoTimerId: -1,
            isUpdated: 0,
            payUrl: '',
        };
    },

    computed: {
    },

    methods: {
        initVipState() {
            let isVip = ls.get('client-vip') || '';
            let exp = ls.get('client-vip-express-day') || '';
            let code = `${isVip}-a-${exp}`;
            this.vipState = code;
        },
        reSetState() {
            this.isUpdated = 0;
            this.isChecking = 0;
            this.noChange = 0;
            this.infoTime = 0;
            this.secondStr = '60S';
        },
        show() {
            this.visible = true;
            this.reSetState();
        },
        checkVip() {
            // getPdfConverterVipInfo
            this.removeTaskInfoTimer();
            this.isUpdated = 0;
            this.isChecking = 1;
            this.noChange = 0;
            this.infoTime = 0;
            this.secondStr = `${this.maxTime - this.infoTime}s`;
            let checkInfo = function() {
                console.log('check---check');
                console.log(this.secondStr);
                let _this = this;
                this.secondStr = `${_this.maxTime - _this.infoTime}s`;
                vip.getVip(_this.checkLicense);
                // getPdfConverterVipInfo().then((response) => {
                //     console.log('response', response);
                //     const data = response.data;
                //     _this.vipBack(data);
                // }).catch((error) => {
                // _this.vipErr(error);
                // });
                this.infoTime += 1;
                if (this.infoTime >= this.maxTime) {
                    this.removeTaskInfoTimer();
                    if (!this.isUpdated) {
                        this.showRecheck();
                    }
                }
            }.bind(this);
            var timer = TimeManager.timer(checkInfo, 1000, this);
            this.infoTimerId = timer.id;
            TimeManager.addTimer(timer);
        },
        checkLicense(data) {
            // 111
            if (data && data.isVip) {
                this.$emit('vip-info-update', data);
                // let exp = data.expire_date;
                // let code = `1-a-${exp}`;
                // if (code !== this.vipState) {
                // 转换成功
                this.removeTaskInfoTimer();
                this.isUpdated = 1;
                this.noChange = 0;
                this.close();
                this.$router.push('/info');
                // }
            }
        },
        showRecheck() {
            this.noChange = 1;
        },
        removeTaskInfoTimer() {
            this.isChecking = 0;
            if (this.infoTimerId === -1) {
                return;
            }
            TimeManager.delTimer(this.infoTimerId);
            this.infoTimerId = -1;
        },
        vipBack(data) {
            console.log('vipBack', data);
            if (data.data.license_info && data.data.license_info.is_activated === 1) {
                ls.set('client-vip', '1');
                ls.set('client-vip-express-day', data.data.license_info.expire_date);
                let isVip = 1;
                let exp = data.data.license_info.expire_date;
                let code = `${isVip}-a-${exp}`;
                if (code !== this.vipState) {
                    // 转换成功
                    this.removeTaskInfoTimer();
                    this.isUpdated = 1;
                    this.noChange = 0;
                    this.close();
                }
            } else {
                ls.set('client-vip', 0);
            }
        },
        vipErr(error) {
            console.log('vipErr', error);
            ls.set('client-vip', 0);
        },
        toRepay() {
            this.openPayUrl(this.payUrl);
            this.reSetState();
            // this.checkVip();
        },
        openPayUrl(url) {
            if (!url) {
                return;
            }
            if (window.account) {
                openUrl(url);
            } else {
                window.open(url);
            }
        },
        close() {
            this.removeTaskInfoTimer();
            this.visible = false;
            this.isUpdated = 0;
            this.isChecking = 0;
            this.noChange = 0;
            this.infoTime = 0;
            this.secondStr = '60S';
        },
    },

    watch: {
    },
};
</script>

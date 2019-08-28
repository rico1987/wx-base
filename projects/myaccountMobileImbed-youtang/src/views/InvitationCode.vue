<template>
    <div class="myaccount-invitation-code has-header has-loading">
        <MobileHeader
            defaultLeft
            isReturnToNative
            :title="$t('001819')"
        >
        </MobileHeader>
        <div class="invitation-code-info" v-if="route === 'invitation-code-info'">
            <p class="tip">{{ $t('001820') }}</p>
            <input type="text" v-model="invitationInfo.code" readonly />
            <p class="has-invited">{{ $t('001821') }} <span>{{ invitationInfo.used_times }}</span>/<span>{{invitationInfo.total_times}}</span></p>
            <span
                class="btn btn-primary"
                :class="{ 'btn-disabled': !invitationInfo.available_space }"
                @click="getAvailableSpace()"
                v-if="availableSpace"
            >
                {{ $t('001822', { space: availableSpace }) }}
            </span>
            <div class="footer">
                <span @click="route='share-with-app'">{{ $t('001823') }}</span>
                <span @click="checkStatus()">{{ $t('001824') }}</span>
            </div>
        </div>
        <div class="share-with-app" v-if="route === 'share-with-app'">
            <p class="tip">{{ $t('001825') }}</p>
            <ul class="apps" v-if="!isCn">
                <li class="sharer-google" @click="shareContent('google')"></li>
                <li class="sharer-facebook" @click="shareContent('facebook')"></li>
                <li class="sharer-twitter" @click="shareContent('twitter')"></li>
            </ul>
            <ul class="apps" v-if="isCn">
                <li class="sharer-weixin" @click="shareContent('weixin')"></li>
                <li class="sharer-douban" @click="shareContent('douban')"></li>
                <li class="sharer-weibo" @click="shareContent('weibo')"></li>
            </ul>
            <div class="footer">
                <span @click="route='invitation-code-info'">{{ $t('001826') }}</span>
            </div>
        </div>
        <div class="congrats" v-if="route === 'congrats'">
            <p class="tip">{{ $t('001827', { obtainedSpace: obtainedSpace }) }}</p>
            <div class="cup"></div>
            <div class="footer">
                <span @click="route='share-with-app'">{{ $t('001828') }}</span>
            </div>
        </div>
        <div class="invited" v-if="route === 'invited'">
            <p class="tip">{{ $t('001829') }}</p>
            <span class="btn btn-primary" @click="route='share-with-app'">{{ $t('001828') }}</span>
        </div>
        <div class="use-invitation-code" v-if="route === 'use-invitation-code'">
            <p class="tip">{{ $t('001830') }}</p>
            <input type="text" maxlength="10" v-model="code" />
            <span
                class="btn btn-primary"
                :class="{ 'btn-disabled': !code }"
                @click="submitInvitationCode()"
            >{{ $t('001831') }}</span>
            <div class="footer">
                <span @click="route='share-with-app'">{{ $t('001828') }}</span>
            </div>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import { getNativeData, saveNativeData, shareToApp, saveLog, onRegister, } from '@lib/utils/embedded';
import MobileHeader from '@/components/MobileHeader.vue';
import { loginAirmoreCloud, getInvitationCodeInfo, checkHasUsedInvitationCode, getSpace, useInvitationCode, } from '@/api/account';
import Icon from '@/components/Icon.vue';

export default {
    name: 'invitationCode',
    components: {
        MobileHeader,
        Icon,
    },
    data() {
        return {
            invitationInfo: {},
            route: 'invitation-code-info',
            cloudApiToken: null, // airmore cloud的api_token,需要拿用户中心的identity_token去换
            loading: false,
            code: null,
            isCn: false,
            obtainedSpace: 1,
            availableSpace: null,
        };
    },

    created: function() {

        // ios 和 android 传的中文语言代码不一致
        this.isCn = this.$i18n.locale === 'cn' || this.$i18n.locale === 'zh';
        // 使用用户中心的identity_token去换取airmore cloud的api_token并保存
        this.loading = true;
        let saveData = getNativeData();
        saveLog(JSON.stringify(saveData));
        let identity_token = saveData['identity_token'];
        saveLog(`identity_token=${identity_token}`);
        loginAirmoreCloud(identity_token)
            .then((res) => {
                saveLog(JSON.stringify(res));
                if (res.data && res.data.data && res.data.data.user) {
                    this.cloudApiToken = res.data.data.user.api_token;
                    saveData['cloud_api_token'] = this.cloudApiToken;

                    saveLog(JSON.stringify(saveData));
                    if (res.data.data.user.is_new) {
                        onRegister();
                    }
                    saveLog('before saveData');
                    saveNativeData(saveData);
                    saveLog(JSON.stringify(saveData));
                    getInvitationCodeInfo(this.cloudApiToken)
                        .then((res) => {
                            saveLog(JSON.stringify(res));
                            if (res.data && res.data.data) {
                                this.invitationInfo = res.data.data;
                                this.availableSpace = Math.floor(this.invitationInfo.available_space / 1024 / 1024 / 1024);
                                this.loading = false;
                            }
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            })
            .catch(() => {
                this.loading = false;
            });
    },

    methods: {
        checkStatus: function() {
            this.loading = true;
            checkHasUsedInvitationCode()
                .then((res) => {
                    if (res.data && res.data.data && res.data.data.has_guider === 0) {
                        this.route = 'use-invitation-code';
                    } else {
                        this.route = 'invited';
                    }
                    this.loading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },

        submitInvitationCode: function() {
            if (!this.code) {
                this.$toast.show({
                    text: this.$t('001832'),
                });
                return false;
            }
            useInvitationCode(this.code)
                .then((res) => {
                    if (res.data.error) {
                        switch (res.data.status) {
                        case -214:
                            this.$toast.show({
                                text: this.$t('001833'),
                            });
                            break;
                        case -215:
                            this.$toast.show({
                                text: this.$t('001834'),
                            });
                            break;
                        case -216:
                            this.$toast.show({
                                text: this.$t('001835'),
                            });
                            break;
                        default:
                            this.$toast.show({
                                text: this.$t('001836'),
                            });
                        }
                    } else {
                        this.obtainedSpace = 1;
                        this.route = 'congrats';
                    }
                })
                .catch(() => {
                    this.$toast.show({
                        text: this.$t('001836'),
                    });
                });
        },

        getAvailableSpace: function() {
            if (!this.invitationInfo.available_space) {
                this.$toast.show({
                    text: this.$t('001837'),
                });
                return false;
            }
            if (this.invitationInfo.code) {
                getSpace(this.invitationInfo.code)
                    .then((res) => {
                        if (res.data.error) {
                            switch (res.data.status) {
                            case -220:
                                this.$toast.show({
                                    text: this.$t('001837'),
                                });
                                break;
                            default:
                                this.$toast.show({
                                    text: this.$t('001837'),
                                });
                            }
                        } else {
                            this.obtainedSpace = Math.floor(this.invitationInfo.available_space / 1024 / 1024 / 1024);
                            this.route = 'congrats';
                        }
                    })
                    .catch(() => {
                        this.$toast.show({
                            text: this.$t('001837'),
                        });
                    });
            } else {
                this.$toast.show({
                    text: this.$t('001837'),
                });
                return false;
            }
        },

        shareContent: function(app) {
            let content;
            if (this.isCn) {
                content = `我的爱莫云盘存储空间不足，快来帮我抢更多云空间吧！注册后输入我的邀请码：${this.invitationInfo.code}， 我就能获得免费存储空间啦！同样有惊喜等着你哦！`;
            } else {
                // eslint-disable-next-line
                content = `I'm in need of more cloud storage space! Help me get more on ApowerCloud! After registration, enter my invite code: ${this.invitationInfo.code}, then I'll get more space! There is also a surprise for you! `;
            }
            shareToApp(app, content);
        },
    },

    filters: {
        GB: function(value) {
            return Math.floor(value / 1024 / 1024 / 1024);
        },
    },
};
</script>

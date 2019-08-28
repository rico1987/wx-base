<template>
    <div class="myaccount-info has-header has-loading">
        <MobileHeader
            defaultLeft
            :title="$t('001263')"
        >
        </MobileHeader>
        <div class="avatar-container">
            <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
            <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
        </div>
        <div class="list" v-if="!isLightmv">
            <p><span>{{ $t('001296') }}</span><span>{{ userInfo.nickname }}</span></p>
            <p><span>{{ $t('001298') }}</span><span>{{ userInfo.first_name }}</span></p>
            <p><span>{{ $t('001299') }}</span><span>{{ userInfo.last_name }}</span></p>
            <p><span>{{ $t('001300') }}</span><span>{{ getGender(userInfo.gender) }}</span></p>
            <p><span>{{ $t('001301') }}</span><span>{{ userInfo.birthday }}</span></p>
            <p><span>{{ $t('001302') }}</span><span>{{ userInfo.company }}</span></p>
            <p><span>{{ $t('001303') }}</span><span>{{ userInfo.industry }}</span></p>
            <p><span>{{ $t('001305') }}</span><span>{{ userInfo.education }}</span></p>
            <p><span>{{ $t('001306') }}</span><span>{{ userInfo.address }}</span></p>
            <p><span>{{ $t('001307') }}</span><span>{{ userInfo.city }}</span></p>
            <p><span>{{ $t('001308') }}</span><span>{{ userInfo.postcode }}</span></p>
            <p><span>{{ $t('001309') }}</span><span>{{ userInfo.country }}</span></p>
        </div>
        <div class="list" v-if="isLightmv && lightmvVipInfo">
            <p>
                <span>{{ $t('001866') }}</span>
                <span>{{ lightmvVipInfo.priority_make_num }}</span>
            </p>
            <p>
                <span>{{ $t('001868') }}</span>
                <span>{{ lightmvVipInfo.material_limit_num }}</span>
            </p>
            <p>
                <span>{{ $t('001870') }}</span>
                <span>{{ lightmvVipInfo.video_limit_num }}</span>
            </p>
            <p>
                <span>{{ $t('001871') }}</span>
                <span>{{ lightmvVipInfo.task_limit_num }}</span>
            </p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';
import { getLightmvVipInfo, } from '@/api/lightmv';

export default {
    name: 'info',
    components: {
        Icon,
        MobileHeader,
    },
    data() {
        return {
            userInfo: null,
            lightmvVipInfo: null,
            loading: false,
        };
    },

    created: function() {
        this.getUserInfo();
        const lightmvVipInfo = Cookies.get('lightmvVipInfo');
        if (lightmvVipInfo) {
            try {
                this.lightmvVipInfo = JSON.parse(lightmvVipInfo);
            } catch (e) {
                this.lightmvVipInfo = null;
            }
        } else {
            this.getLightmvVipInfo();
        }
    },
    methods: {
        getLightmvVipInfo() {
            this.loading = true;
            getLightmvVipInfo()
                .then((res) => {
                    if (res.data.status === '1') {
                        this.lightmvVipInfo = res.data.data && res.data.data.vip;
                        console.log(this.lightmvVipInfo);
                    }
                    this.loading = false;
                });
        },

        getUserInfo() {
            let saveData = Cookies.get('userInfo');
            try {
                this.userInfo = JSON.parse(saveData);
            } catch (error) {
            }
        },

        getGender(value) {
            if (value === '1') {
                return this.$t('001272');
            } else if (value === '2') {
                return this.$t('001273');
            } else {
                return this.$t('001274');
            }
        },
    },
};
</script>

<template>
    <div class="myaccount-info has-header">
        <MobileHeader
            defaultLeft
            title="Personal information"
        >
        </MobileHeader>
        <div class="avatar-container">
            <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
            <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
        </div>
        <div class="list">
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
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';

export default {
    name: 'info',
    components: {
        MobileHeader,
    },
    data() {
        return {
            userInfo: null,
        };
    },

    created: function() {
        this.getUserInfo();

    },
    methods: {
        getUserInfo() {
            let saveData = Cookies.get('userInfo');
            try {
                this.userInfo = JSON.parse(saveData);
                console.log(this.userInfo);
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

<template>
    <div class="myaccount-account-menu">
        <div class="header">
            <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
            <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
            <p class="nickname">{{userInfo.nickname}}</p>
            <p class="privileges" @click="goto('unlimited-vip')">
                Unlimited VIP Privileges
            </p>
        </div>
        <div class="container">
            <ul class="mobile-list-items">
                <li class="mobile-list-items__item item-1" @click="goto('info')">{{ $t("001263") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-2" @click="goto('orders')">{{ $t("001264") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-3" @click="goto('work-list')">{{ $t("001265") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-4" @click="goto('reset-password')">{{ $t("001266") }}
                    <span></span>
                </li>
                <li class="mobile-list-items__item item-5" @click="goto('setting')">{{ $t("001401") }}
                    <span></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'accountMenu',
    components: {
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
            } catch (error) {
            }
        },
        goto(path) {
            this.$router.push({ path, });
        },
    },
};
</script>

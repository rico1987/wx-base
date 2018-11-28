<template>
    <div class="myaccount-account-menu">
        <div class="header">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" />
            <p>{{userInfo.nickname}}</p>
        </div>
        <div class="container">
            <ul class="mobile-list-items">
                <li class="mobile-list-items__item" @click="goto('info')">{{ $t("001263") }}</li>
                <li class="mobile-list-items__item" @click="goto('orders')">{{ $t("001264") }}</li>
                <li class="mobile-list-items__item" @click="goto('work-list')">{{ $t("001265") }}</li>
                <li class="mobile-list-items__item" @click="goto('reset-password')">{{ $t("001266") }}</li>
                <li class="mobile-list-items__item" @click="goto('setting')">{{ $t("001401") }}</li>
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
        this.getAvatarUrl();
    },
    methods: {
        getAvatarUrl() {
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

<template>
    <div class="user-info">
        <div class="avatar">
            <img v-show="userInfo && userInfo.avatar" :src="userInfo.avatar">
        </div>
        <div class="user-name">{{userInfo.nickname}}</div>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',

    componentName: 'UserInfo',

    props: [
        'info',
    ],
    data() {
        return {
            userInfo: this.info,
        };
    },

    computed: {
    },
};
</script>
<style lang="scss">
</style>

<template>
    <div class="main-bar">
            <div class="item"
            v-for="tabItem in tabArr"
            :key="tabItem.key"
            :class="[tabItem.key, tabItem.key == type ? 'active': '' ]"
            >
                <div class="img"></div>
                <div class="item-name">{{$tr(tabItem.trkey)}}</div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'MainBar',

    componentName: 'MainBar',

    props: {
        type: {
            type: String,
            default: 'from-pdf',
        },
    },

    data() {
        return {
            tabArr: [
                {
                    key: 'from-pdf',
                    trkey: 'PDF转换@@1212',
                },
                {
                    key: 'to-pdf',
                    trkey: '转为PDF@@1212',
                },
                {
                    key: 'merge-pdf',
                    trkey: '合并PDF@@1212',
                },
                {
                    key: 'user-center',
                    trkey: '我的@@1212',
                },
            ],
        };
    },

    provide() {
        return {
            MainBar: this,
        };
    },
};
</script>

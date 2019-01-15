<template>
    <div class="main-bar">
            <div class="item"
            v-for="tabItem in tabArr"
            :key="tabItem.key"
            :class="[tabItem.key, tabItem.key == type ? 'active': '' ]"
            @click="jumpTo(tabItem.key)"
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
            tabMap: {
                'from-pdf': '/home',
                'to-pdf': '/topdf',
                'merge-pdf': '/mergepdf',
                'user-center': '/info',
            },
            tabArr: [
                {
                    key: 'from-pdf',
                    trkey: 'PDF转换@@001707',
                },
                {
                    key: 'to-pdf',
                    trkey: '转为PDF@@001817',
                },
                {
                    key: 'merge-pdf',
                    trkey: '合并PDF@@002082',
                },
                {
                    key: 'user-center',
                    trkey: '我的@@1212',
                },
            ],
        };
    },

    methods: {
        jumpTo: function(tabName) {
            let url = this.tabMap[tabName];
            if (!url) {
                return;
            }
            this.$router.push(url);
        },
    },

    provide() {
        return {
            MainBar: this,
        };
    },
};
</script>

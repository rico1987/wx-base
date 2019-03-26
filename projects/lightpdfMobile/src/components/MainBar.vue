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
import {getNativeData, jump, } from '../utils/index';

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
                    trkey: 'Convert PDF@@001707',
                },
                {
                    key: 'to-pdf',
                    trkey: 'To PDF@@001817',
                },
                {
                    key: 'merge-pdf',
                    trkey: 'Merge PDF@@002082',
                },
                {
                    key: 'user-center',
                    trkey: 'Me@@002048',
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
            console.log(url);
            let data = getNativeData();
            console.log(data);
            console.log(data.userInfo);
            // if (url === '/info' && !(data.identity_token && data.userInfo)) {
            //     this.toUserCenter();
            //     return;
            // }
            if (process.isIos === '1') {
                if (url === '/info') {
                    url = {
                        path: '/info',
                        query: {
                            vip: Math.ceil(1000 * Math.random()),
                        },
                    };
                }
                this.$router.push(url);
            }
        },
        toUserCenter() {
            console.log('09090909090');
            let data = getNativeData();
            console.log(data);
            let params = {};
            let obj = {
                project: 'lightpdf',
                router: '/info',
                query: {
                    lang: this.$i18n.locale,
                },
            };
            params.backobj = encodeURIComponent(JSON.stringify(obj));
            jump('lightpdf', 'account', '/login', params);
            // jump('lightpdf', 'account', '/login', params);
        },
    },

    provide() {
        return {
            MainBar: this,
        };
    },
};
</script>

<template>
    <div class="index-container">
        <div class="top-title">
            <div class="title-content">PDF转换工具</div>
            <div class="title-des">
                {{tr('aaa@@001193')}}
            </div>
        </div>
        <div class="convert-box">
            <div class="convert-item" v-for="item in convertkey" :class="item" :key="item"  @click="goConvert(item)">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box tl"></div>
            </div>
            <div class="convert-item pdf-to-word" data-ttype="pdf-to-word" @click="goConvert($event)">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box tl"></div>
            </div>
            <div class="convert-item pdf-to-excel">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">pdf to excel</div>
                <div class="border-box tc"></div>
            </div>
            <div class="convert-item pdf-to-ppt">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box tr"></div>
            </div>

            <div class="convert-item pdf-to-word">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box cl"></div>
            </div>
            <div class="convert-item pdf-to-excel">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">pdf to excel</div>
                <div class="border-box cc"></div>
            </div>
            <div class="convert-item pdf-to-ppt">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box cr"></div>
            </div>

            <div class="convert-item pdf-to-word">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">Conversion de PDF en PNG...</div>
                <div class="border-box bl"></div>
            </div>
            <div class="convert-item pdf-to-excel">
                <div class="img-box"><div class="img"></div></div>
                <div class="convert-name">pdf to excel</div>
                <div class="border-box bc"></div>
            </div>
        </div>
        <div class="main-bar">
            <div class="item active from-pdf">
                <div class="img"></div>
                <div class="item-name">PDF转换</div>
            </div>
            <div class="item active to-pdf">
                <div class="img"></div>
                <div class="item-name">转为PDF</div>
            </div>
            <div class="item active merge-pdf">
                <div class="img"></div>
                <div class="item-name">PDF合并</div>
            </div>
            <div class="item active user-center">
                <div class="img"></div>
                <div class="item-name">我的</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'home',
    components: {
    },
    data() {
        return {
            convertkey: [
                'pdf-to-word',
                'pdf-to-excel',
                'pdf-to-ppt',
            ],
        };
    },

    created: function() {
    },
    methods: {
        tr: function(keyStr) {
            if (!keyStr) {
                return '';
            }
            let old = '';
            let key = '';
            let index = keyStr.indexOf('@@');
            if (index !== -1) {
                old = keyStr.substring(0, index);
                key = keyStr.substring(index + 2, keyStr.lenght);
            } else {
                key = keyStr;
            }
            let value = this.$t(key);
            if (value === key && old.length) {
                value = old;
            }
            return value;
        },
        goConvert: function(e) {
            console.log(e);
            console.log(this.$t('333'));
            console.log(this.tr('aaa@@001193'));
            // this.$router.push('/convert');
        },
    },
};
</script>

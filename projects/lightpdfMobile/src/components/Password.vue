<template>
    <div class="pdf-password" v-show="visible">
       <div class="pdf-password__mask">
       </div>
        <div
            class="pdf-password__wrapper"
        >
            <p class="pdf-password__title"> input password</p>
            <p class="file-name" v-show="filename">{{filename}}</p>
            <input ref="input" class="pdf-password__input" placeholder="password">
            <div class="pdf-password__btn" @click="onSet">sure</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PdfPassword',

    componentName: 'PdfPassword',

    props: {
    },

    data() {
        return {
            visible: false,
            timeout: null,
            ntxt: this.text,
            pwd: '',
            filename: 'aaa',
        };
    },

    computed: {
    },

    methods: {
        onSet() {
            console.log(this.$refs.input.value);
            let str = this.$refs.input.value;
            if (str.length) {
                this.pwd = str;
            }
            this.visible = false;
        },
        close() {
            this.visible = false;
            this.$emit('close');
        },
        msg(txt) {
            this.ntxt = txt;
            this.filename = txt;
            this.visible = true;
        },
    },

    watch: {
        visible(val) {
            if (!val) {
                this.$emit('on-set');
            }
        },
    },
};
</script>

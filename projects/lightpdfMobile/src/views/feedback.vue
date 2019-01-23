<template>
    <div class="feedback-container">
        <div class="inner-container">
            <pdf-header ref="header" :disablejump="1" @click-jump="back">{{headerTitle}}</pdf-header>
            <div class="item mail">
                <div class="label">{{$tr('Email@@email')}}</div>
                <input ref="mail" class="input" type="text" placeholder="example@gmail.com">
            </div>
            <div class="item subject">
                <div class="label">{{$tr('Subject@@subject')}}</div>
                <input ref="subject" class="input" type="text" :placeholder="$tr('Subject@@subject')">
            </div>
            <textarea ref="content" name="content" class="textarea"></textarea>
            <div class="submit" @click="sendMsg">{{$tr('OK@@ok')}}</div>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import {nativeFeedBack, } from '../utils/index';

export default {
    name: 'feedBack',
    components: {
        'pdf-header': PdfHeader,
    },
    data() {
        return {
            headerTitle: '',
            backObj:null,
        };
    },

    created: function() {
        this.headerTitle = this.$tr('Feedback@@001853');
    },
    methods: {
        sendMsg() {
            console.log(this.$router);
            console.log(this.$route);
            let mail = '';
            let subject = '';
            let content = '';
            mail = this.$refs.mail.value;
            subject = this.$refs.subject.value;
            content = this.$refs.content.value;
            console.log(mail, subject, content);
            if (mail && content) {
                nativeFeedBack(mail, content, subject);
            }
        },
        back() {
            if (window.history.length > 1) {
                this.$router.back(-1);
            }
        },
    },
};
</script>

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
            <textarea ref="content" name="content" class="textarea" :placeholder="$tr('Feedback@@001853')"></textarea>
            <div class="submit" @click="sendMsg">{{$tr('OK@@ok')}}</div>
            <message ref="msg" :transition="'fade'"></message>
        </div>
    </div>
</template>

<script>
import PdfHeader from '../components/PdfHeader.vue';
import {nativeFeedBack, isNetConnect, backToIosNative, } from '../utils/index';
import Message from '../components/Message.vue';

export default {
    name: 'feedBack',
    components: {
        'pdf-header': PdfHeader,
        'message': Message,
    },
    data() {
        return {
            headerTitle: '',
            backObj: null,
        };
    },

    created: function() {
        this.headerTitle = this.$tr('Feedback@@001853');
    },
    methods: {
        sendMsg() {
            // console.log(this.$router);
            // console.log(this.$route);
            let mail = '';
            let subject = '';
            let content = '';
            mail = this.$refs.mail.value.trim();
            subject = this.$refs.subject.value.trim();
            content = this.$refs.content.value.trim();
            // console.log(mail, subject, content);

            if (mail === '') {
                this.msg(this.$tr('Email and feedback can not be empty.@@002047'));
                return;
            }
            if (content === '') {
                this.msg(this.$tr('Email and feedback can not be empty.@@002047'));
                return;
            }
            if (!this.checkEmail(mail)) {
                this.msg(this.$tr('Please input a valid email address!@@invalid_email'));
                return;
            }
            if (mail && content) {
                nativeFeedBack(mail, content, subject);
                if (isNetConnect()) {
                    this.back();
                }
            }
        },
        checkEmail(mailStr) {
            let reg = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
            return mailStr && reg.test(mailStr);
        },
        msg: function(txt) {
            this.$refs.msg.msg(txt);
        },
        back() {
            if (window.history.length > 1) {
                this.$router.back(-1);
            } else {
                backToIosNative();
            }
        },
    },
};
</script>

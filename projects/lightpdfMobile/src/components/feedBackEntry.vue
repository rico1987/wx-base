<template>
    <div ref="btn" class="feed-back-entry" :style="{left: left,top: top,opacity: opacity}"
    @touchmove="onTouchMove"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
        <div class="entry-img"></div>
    </div>
</template>

<script>
import ls from '../utils/littleStore';

export default {
    name: 'feedBackEntry',

    componentName: 'feedBackEntry',

    components: {
    },

    props: [
        'item',
    ],
    data() {
        return {
            isShow: 0,
            isShowDel: 0,
            fileList: [],
            uniqKey: 0,
            index: 0,
            left: '6.12rem',
            top: '8.3rem',
            isMove: 0,
            opacity: 0,
        };
    },
    computed: {
    },
    mounted() {
        this.checkPos();
        setTimeout(() => {
            this.initPos();
        }, 200);
    },
    methods: {
        cancel() {
            this.isShow = 0;
        },
        checkPos() {
            let x = ls.get('feedback-pos-x');
            let y = ls.get('feedback-pos-y');
            if (x !== null && y !== null) {
                this.left = `${x}px`;
                this.top = `${y}px`;
                this.opacity = 1;
            }
        },
        initPos() {
            let rect = this.$refs.btn.getBoundingClientRect();
            let width = rect.width;
            let height = rect.height;
            let maxWidth = document.body.clientWidth;
            let maxHeight = document.body.clientHeight;
            let left = 0;
            let top = 0;
            // console.log('----------');
            // console.log(maxWidth, maxHeight);
            // console.log(width, height);
            left = maxWidth - (2 * width);
            // left = `${left}px`;
            top = maxHeight - (4.5 * height);
            // top = `${top}px`;
            let x = ls.get('feedback-pos-x');
            let y = ls.get('feedback-pos-y');
            if (x !== null && y !== null) {
                if (x >= 0 && x < maxWidth && y >= 0 && y < maxHeight) {
                    left = x;
                    top = y;
                }
            } else {
                ls.set('feedback-pos-x', (left));
                ls.set('feedback-pos-y', (top));
            }
            this.left = `${left}px`;
            this.top = `${top}px`;
            this.opacity = 1;
        },
        onTouchMove(e) {
            this.isMove = 1;
            let rect = this.$refs.btn.getBoundingClientRect();
            let width = rect.width;
            let height = rect.height;
            let maxWidth = document.body.clientWidth;
            let maxHeight = document.body.clientHeight;
            let left = 0;
            let top = 0;
            left = e.changedTouches[0].pageX - (width / 2);
            if (left + width > maxWidth) {
                left = maxWidth - width;
            }
            if (left < 0) {
                left = 0;
            }
            // left = `${left}px`;
            top = e.changedTouches[0].pageY - (height / 2);
            if (top + height > maxHeight) {
                top = maxHeight - height;
            }
            if (top < 0) {
                top = 0;
            }
            // top = `${top}px`;
            ls.set('feedback-pos-x', (left));
            ls.set('feedback-pos-y', (top));
            this.left = `${left}px`;
            this.top = `${top}px`;
        },
        onTouchStart() {
            this.isMove = 0;
        },
        onTouchEnd() {
            if (this.isMove === 0) {
                this.goFeedBack();
            }
        },
        goFeedBack() {
            console.log('-0-0-0-0--');
            // let obj = {
            //     path: this.$route.path,
            //     query: this.$route.query,
            // };
            this.$router.push({
                path: '/feedback',
            });
        },
    },
};
</script>

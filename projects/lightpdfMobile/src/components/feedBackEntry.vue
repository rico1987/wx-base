<template>
    <div ref="btn" class="feed-back-entry" :style="{left: left,top: top}"
    @touchmove="onTouchMove"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
        <div class="entry-img"></div>
    </div>
</template>

<script>

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
            left: '6.52rem',
            top: '9.9rem',
            isMove: 0,
        };
    },
    computed: {
    },
    methods: {
        cancel() {
            this.isShow = 0;
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
            left = `${left}px`;
            top = e.changedTouches[0].pageY - (height / 2);
            if (top + height > maxHeight) {
                top = maxHeight - height;
            }
            if (top < 0) {
                top = 0;
            }
            top = `${top}px`;
            this.left = left;
            this.top = top;
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
            let obj = {
                path: this.$route.path,
                query: this.$route.query,
            };
            this.$router.push({
                path: '/feedback',
            });
        },
    },
};
</script>

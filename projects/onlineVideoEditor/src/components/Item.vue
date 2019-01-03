<template>
    <div class="editor-item">
    </div>
</template>

<script>

export default {
    name: 'Item',

    componentName: 'Item',

    components: {
    },

    props: {
        type: String, // 'video', 'audio', 'image', 'text', 'filter', 'overlay', 'transition', 'animation'

    },

    data() {
        return {
            // for all
            track: null,
            startTime: null,
            duration: null,

            // for videos
            isMute: false,
            speed: 1, // 0.2 - 5
            rotate: 0,
            flipHorizontal: false,  // 水平翻转
            flipVertical: false,    // 垂直翻转
            contrast: 0,   // 对比度    -100 - 100
            saturation: 0, // 饱和度    -100 - 100
            luminance: 0,   // 亮度     -100 - 100
            hue: 0,         // 色调     -100 - 100

            // for text
            fontSize: 0,
            fontColor: null,
            textContent: null,

            // for filter
            filterAlgorithm: null,

            // for overlay
            imageUrl: null,

            // for transition
            transitionAlgorithm: null,

            // for animation
            videoUrl: null,

        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

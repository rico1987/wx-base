<template>
    <div class="editor-main-container">
        <div class="editor-main-container__top">
            <Material class="editor-main-container__material"></Material>
            <Preview class="editor-main-container__preview"></Preview>
        </div>
        <div class="editor-main-container__bottom">
            <TimeLine></TimeLine>
        </div>
    </div>
</template>

<script>
import Material from '@/components/Material.vue';
import TimeLine from '@/components/TimeLine.vue';
import Preview from '@/components/Preview.vue';

export default {
    name: 'video-editor',
    components: {
        Material,
        TimeLine,
        Preview,
    },
    data() {
        return {
        };
    },

    created: function() {
    },
    methods: {
    },
};
</script>

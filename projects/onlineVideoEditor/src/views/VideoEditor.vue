<template>
    <div class="editor-main-container">
        <div class="editor-main-container__top">
            <Material class="editor-main-container__material"></Material>
            <Player class="editor-main-container__Player"></Player>
        </div>
        <div class="editor-main-container__bottom">
            <TimeLine></TimeLine>
        </div>
    </div>
</template>

<script>
import Material from '@/components/Material.vue';
import TimeLine from '@/components/TimeLine.vue';
import Player from '@/components/Player.vue';

export default {
    name: 'video-editor',
    components: {
        Material,
        TimeLine,
        Player,
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

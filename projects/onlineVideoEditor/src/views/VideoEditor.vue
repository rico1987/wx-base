<template>
    <div class="editor-main-container">
        <Material></Material>
        <TimeLine></TimeLine>
    </div>
</template>

<script>
import Material from '@/components/Material.vue';
import TimeLine from '@/components/TimeLine.vue';

export default {
    name: 'video-editor',
    components: {
        Material,
        TimeLine,
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

<template>
    <div class="editor-material">
        <div class="editor-material__menu">
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'materials' }" @click="loadMaterial('materials')">
                <p>素材</p>
            </div>
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'text' }" @click="loadMaterial('text')">
                <p>文字</p>
            </div>
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'filters' }" @click="loadMaterial('filters')">
                <p>滤镜</p>
            </div>
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'overlays' }" @click="loadMaterial('overlays')">
                <p>叠附</p>
            </div>
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'transitions' }" @click="loadMaterial('transitions')">
                <p>转场</p>
            </div>
            <div class="editor-material__menu-button" :class="{ 'active': activeCategory === 'animations' }" @click="loadMaterial('animations')">
                <p>动画</p>
            </div>
        </div>
        <div class="editor-material__content">
            <div class="editor-material__content-materials" v-if="activeCategory === 'materials'">
                <div v-for="material in materials">

                </div>
            </div>
        </div>
        <div class="fx-explorer__sash vertical" id="ExplorerSash">
        </div>
    </div>
</template>

<script>

export default {
    name: 'material',
    components: {
    },
    data() {
        return {
            categories: ['materials', 'text', 'filters', 'overlays', 'transitions', 'animations', ],
            activeCategory: 'materials',
            materials: [{
                id: 1,
                cover: '',
                type: 'image',
                url: '',
            }, {
                id: 2,
                cover: '',
                type: 'video',
                m3u8: null,
            }],
        };
    },

    created: function() {
        this.loadMaterial('materials');
    },
    methods: {

        loadMaterial(category) {
            this.activeCategory = category;
            if (category === 'materials') {
                return
            }
        },

        switchCategory() {

        },

        handleOpen() {

        },

        handleClose() {

        },
    },
};
</script>

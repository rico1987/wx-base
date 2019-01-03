<template>
    <div class="editor-material">
        <div class="editor-material__switch">
            <div v-for="category in categories" v-bind:key="category" @click="switchCategory(category)">
                <p>{{ category }}</p>
            </div>
        </div>
        <div class="editor-material__content"></div>
    </div>
</template>

<script>

export default {
    name: 'material',
    components: {
    },
    data() {
        return {
            categories: ['materials', 'words', 'filters', 'covers', 'transitions', 'animations', ],
        };
    },

    created: function() {
    },
    methods: {
        switchCategory: () => {

        },
    },
};
</script>

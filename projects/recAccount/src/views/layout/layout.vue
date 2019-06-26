<template>
    <div id="app">
        <!-- <WindowHeader>
            <template v-slot:left>
                <span class="logo"></span>
                <span>ApowerREC</span>
            </template>
            <template v-slot:right>
                <span class="close"></span>
            </template>
        </WindowHeader> -->
        <router-view/>
    </div>
</template>

<script>
import WindowHeader from '@/components/WindowHeader.vue';

export default {
    name: 'Layout',
    components: {
        WindowHeader,
    },
};
</script>

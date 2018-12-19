<template>
    <div class="faq-container">
        <ul>
            <li>
                <h2 @click="showContent()">1.How to display overlay icon/camera?</h2>
                <div class="content">
                    <p>Please follow the steps below to turn on overlay icon/camera:</p>
                    <p>·Solution 1: Enter device settings→“Apps &
                         notifications”→“Permissions” → Choose Apowersoft Screen Recorder →“Set individual permissions” →
                         Turn on “Trust this app”.</p>
                    <p>·Solution 2: Enter device settings → “Apps &
                        notifications” → “App info”/“Apps” → Choose Apowersoft Screen Recorder → Enter “Draw over other apps” under
                        “ADVANCED” →“Permit drawing over other apps.”</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'faq',
    components: {
    },
    data() {
        return {
        };
    },

    created: function() {
    },
    methods: {
        showContent() {

        },
    },
};
</script>

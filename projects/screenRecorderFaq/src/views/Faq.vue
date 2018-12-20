<template>
    <div class="faq-container">
        <ul>
            <li>
                <h2 @click="showContent()">How to display overlay icon/camera?</h2>
                <div class="content">
                    <p>Please follow the steps below to turn on overlay icon/camera:</p>
                    <ul>
                        <li>Solution : Enter device settings → “Apps & notifications” → “App info”/“Apps” →
                        Choose Apowersoft Screen Recorder → Enter
                        “Draw over other apps” under “ADVANCED” →“Permit drawing over other apps.”</li>
                    </ul>
                    <div class="image-wrapper">
                        <img src="/static/faq-1-1.png" />
                        <img src="/static/faq-1-2.png" />
                        <img src="/static/faq-1-3.png" />
                        <img src="/static/faq-1-4.png" />
                        <img src="/static/faq-1-5.png" />
                    </div>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">Why can’t I record internal sound?</h2>
                <div class="content">
                    <p>Android system currently does not support recording internal sound.
                        Please turn on “Record audio” under “Settings” since internal sound can
                        only be recorded via microphone. And we will optimize this function once Android system opened more permissions.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">Why can’t I record voice/Why can’t the other person hear me during the video call?</h2>
                <div class="content">
                    <p>Due to Android system restriction, microphone cannot be used by multiple apps at
                        the same time, but the sound recording on Android is through microphone only.
                        Therefore, you cannot record the voice or be heard by others during the video call.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">Why the recorded video has sound only?</h2>
                <div class="content">
                    <p>Certain apps will prevent users from screen recording their contents because of copyright issues, such as Netflix, etc.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">What are the differences among 3 recording modes?</h2>
                <div class="content">
                    <p>☆ Recording Mode One: Variable bit-rate. </p>
                    <ul>
                        <li>The recording bit-rate ≤ Bit-rate you set</li>
                        <li>Lower resolution than Mode Two</li>
                        <li>Good compatibility</li>
                    </ul>
                    <p>☆ Recording Mode Two: Constant bit-rate.</p>
                    <ul>
                        <li>The recording bit-rate = Bit-rate you set</li>
                        <li>Higher resolution than Mode One</li>
                        <li>Larger video file</li>
                    </ul>
                    <p>☆ Recording Mode Three: Constant quality.</p>
                    <ul>
                        <li>Best video quality</li>
                        <li>Highest resolution</li>
                        <li>Highest CPU utility</li>
                        <li>Biggest video file</li>
                    </ul>
                    <p>You can select the most fit recording mode for your phone since manufacture settings differs among devices.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">How to prevent the video from being choppy?</h2>
                <div class="content">
                    <p>The recording is influenced by device settings, recorded applications,
                        recording settings and CPU storage. Especially when CPU is being taken up
                        too much, the recording may get a little bit choppy during the process.
                        Please enter “Settings” to adjust resolution, bit-rate or frame rate to solve
                        such issue. Meanwhile, it’s highly suggested that all the unnecessary applications
                        should be closed while using the screen recorder.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">How can I prevent app from auto closing or stop the recorded video from freezing?</h2>
                <div class="content">
                    <p>Do not launch the app which also requires the permission of screen capture and close
                        unnecessary applications as many as possible to save enough CPU space.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">Why the recorded video can’t be played in full screen?</h2>
                <div class="content">
                    <p>Incorrect screen orientation settings may cause such problem. Please enter “Settings”
                        and choose the suitable recording orientation (portrait/landscape) for your video.
                        Also, you can click the rotate button at the bottom right corner in the course of playing the video.</p>
                    <div class="image-wrapper">
                        <img src="/static/faq-8-1.png" />
                        <img src="/static/faq-8-2.png" />
                        <img src="/static/faq-8-3.png" />
                    </div>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">How can I prevent screen casting disconnection when opening games on the phone?</h2>
                <div class="content">
                    <p>Due to the restriction of phone system, the screen casting will be cut out if you record from
                        phone at the same time. However, it also can be caused by the automatic highlights recording within
                        the game. Please check and turn off recording-related options in the game. And it’s highly suggested
                        that such game settings should be turned off during screen casting or screen recording.</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">Why the screen is getting choppy when casting to PC? </h2>
                <div class="content">
                    <p>Please go through the steps below to check this issue:</p>
                    <ul>
                        <li>Make sure the network is stable. 5G WIFI is highly recommended.</li>
                        <li>Network limitation: Certain devices may limit the internet speed for application.</li>
                        <li>Network doesn’t match with the screen casting settings. Such as screen casting a 2K high-definition
                            screen over 1m/s network, in this case, the casting will definitely get choppy.</li>
                        <li>Set “Adjust casting quality” as “smooth” is also suggested under such circumstance.</li>
                    </ul>
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
            let target = event.target;
            if (target.nextElementSibling.className === 'content') {
                target.nextElementSibling.setAttribute('class', 'content show');
            } else {
                target.nextElementSibling.setAttribute('class', 'content');
            }
        },
    },
};
</script>

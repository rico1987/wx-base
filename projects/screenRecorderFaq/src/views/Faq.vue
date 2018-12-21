<template>
    <div class="faq-container">
        <ul>
            <li>
                <h2 @click="showContent()">{{ $t('faq-1') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-2') }}</p>
                    <ul>
                        <li>{{ $t('faq-3') }}</li>
                    </ul>
                    <div class="image-wrapper" v-if="language === 'en'">
                        <img src="/static/en/faq-1-1.png" />
                        <img src="/static/en/faq-1-2.png" />
                        <img src="/static/en/faq-1-3.png" />
                        <img src="/static/en/faq-1-4.png" />
                        <img src="/static/en/faq-1-5.png" />
                    </div>
                    <div class="image-wrapper" v-if="language === 'zh'">
                        <img src="/static/zh/faq-1-1.jpg" />
                        <img src="/static/zh/faq-1-2.jpg" />
                        <img src="/static/zh/faq-1-3.jpg" />
                        <img src="/static/zh/faq-1-4.jpg" />
                        <img src="/static/zh/faq-1-5.jpg" />
                    </div>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-4') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-5') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-6') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-7') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-8') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-9') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-10') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-11') }}</p>
                    <ul>
                        <li>{{ $t('faq-12') }}</li>
                        <li>{{ $t('faq-13') }}</li>
                        <li>{{ $t('faq-14') }}</li>
                    </ul>
                    <p>{{ $t('faq-15') }}</p>
                    <ul>
                        <li>{{ $t('faq-16') }}</li>
                        <li>{{ $t('faq-17') }}</li>
                        <li>{{ $t('faq-18') }}</li>
                    </ul>
                    <p>{{ $t('faq-19') }}</p>
                    <ul>
                        <li>{{ $t('faq-20') }}</li>
                        <li>{{ $t('faq-21') }}</li>
                        <li>{{ $t('faq-22') }}</li>
                    </ul>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-23') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-24') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-25') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-26') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-27') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-28') }}</p>
                    <div class="image-wrapper" v-if="language === 'en'">
                        <img src="/static/en/faq-8-1.png" />
                        <img src="/static/en/faq-8-2.png" />
                        <img src="/static/en/faq-8-3.png" />
                    </div>
                    <div class="image-wrapper" v-if="language === 'zh'">
                        <img src="/static/zh/faq-8-1.jpg" />
                        <img src="/static/zh/faq-8-2.jpg" />
                        <img src="/static/zh/faq-8-3.jpg" />
                    </div>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-29') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-30') }}</p>
                </div>
            </li>
            <li>
                <h2 @click="showContent()">{{ $t('faq-31') }}</h2>
                <div class="content">
                    <p>{{ $t('faq-32') }}</p>
                    <ul>
                        <li>{{ $t('faq-33') }}</li>
                        <li>{{ $t('faq-34') }}</li>
                        <li>{{ $t('faq-35') }}</li>
                        <li>{{ $t('faq-36') }}</li>
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
            language: 'en',
        };
    },

    created: function() {
        this.language = this.$i18n.locale;
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

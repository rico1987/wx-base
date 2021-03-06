<template>
    <div class="myaccount-submit-ticket has-header has-loading">
        <MobileHeader
            defaultLeft
            :title="$t('001812')"
        >
        </MobileHeader>
        <div class="container">
            <select class="question-type-select" v-model="type">
                <option value="-1" class="default" disabled selected>{{ $t('001311') }}</option>
                <option v-for="type in TICKET_TYPES" v-bind:key="type.key" :value="type.key">{{ type.value }}</option>
            </select>
            <select class="product-select" v-model="productId">
                <option value="-1" class="default" disabled selected>{{ $t('001315') }}</option>
                <option v-for="product in products"  v-bind:key="product.pro_id" :value="product.pro_id">{{ product.pro_localized_name }}</option>
            </select>
            <MobileInput
                height="59px"
                ref="subjectInput"
                type="text"
                v-model="subject"
                :placeholder='$t("001312")'
                max="20"
            ></MobileInput>
            <textarea rows="3" cols="20" v-model="content">
            </textarea>
            <div class="buttons">
                <input type="file" style="display: none;" @change="upload()" ref="fileInput" id="fileInput" name="file" accept="image/*" />
                <label class="btn" for="fileInput">{{ $t('001288') }}</label>
                <span class="btn btn-primary" @click="submit()">{{ $t('001292') }}</span>
            </div>
            <div v-if="attachments.length > 0" class="attachment">
                <p v-for="attachment in attachments" v-bind:key="attachment.index">
                    {{ attachment.name }}
                    <span @click="removeAttachment(attachment.index)">X</span>
                </p>
            </div>
        </div>

        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import { authorize, upload, } from '@/api/storage';
import { getProductsList, submitTicket, } from '@/api/support';
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';
import MobileInput from '@/components/MobileInput.vue';

export default {
    name: 'submitTicket',
    components: {
        Icon,
        MobileHeader,
        MobileInput,
    },

    created: function() {
        this.getProducts();
    },

    data() {
        return {
            index: 0,
            loading: false,
            content: null,
            products: null,
            subject: null,
            TICKET_TYPES: [
                {
                    key: 1,
                    value: this.$t('001338'),
                },
                {
                    key: 2,
                    value: this.$t('001339'),
                },
                {
                    key: 3,
                    value: this.$t('001340'),
                },
                {
                    key: 4,
                    value: this.$t('001341'),
                },
                {
                    key: 5,
                    value: this.$t('001342'),
                },
                {
                    key: 6,
                    value: this.$t('001343'),
                },
                {
                    key: 7,
                    value: this.$t('001344'),
                },
                {
                    key: 8,
                    value: this.$t('001345'),
                },
            ],
            type: -1,
            productId: -1,
            file: null,
            attachments: [],
        };
    },

    methods: {

        removeAttachment(index) {
            let findIndex = this.attachments.findIndex(ele => ele.index === index);
            this.attachments.splice(findIndex, 1);
        },

        getProducts() {
            getProductsList(this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.products = res.data.data.products;
                    } else {
                        this.$toast.show({
                            text: this.$t('001816'),
                        });
                    }
                });
        },

        submit() {
            if (this.type === -1 || this.productId === -1 || !this.subject) {
                this.$toast.show({
                    text: this.$t('001817'),
                });
                return false;
            }
            let postData = {};
            postData.problem_type = this.type;
            postData.pro_id = this.productId;
            postData.problem_subject = this.subject;
            postData.problem_content = this.content;
            postData.action = 'submit-ticket';
            postData.language = this.$i18n.locale;
            postData.attachments_url = [];
            for (let i = 0; i < this.attachments.length; i += 1) {
                postData.attachments_url.push({
                    url: this.attachments[i].url,
                    name: this.attachments[i].name,
                });
            }
            submitTicket(postData)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.$toast.show({
                            text: this.$t('001347'),
                        });
                        setTimeout(() => {
                            this.$router.push({ path: '/work-list', });
                        }, 1000);
                    } else {
                        this.$toast.show({
                            text: this.$t('001348'),
                        });
                    }
                });

        },

        upload() {
            if (this.attachments.length > 5) {
                return false;
            }
            let acceptExtensions = ['gif', 'jpg', 'jpeg', 'png', 'bmp', ];
            let files = event.target.files;
            if (files && files.length > 0) {
                let file = files[0];
                let extension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
                let fileSize = file.size;
                if (!acceptExtensions.some(ele => ele === extension)) {
                    return false;
                }
                // 大于10M不允许
                if (fileSize > 10 * 1024 * 1024) {
                    return false;
                }
                this.attachmentName = file.name;
                authorize('attachment', JSON.stringify([
                    file.name,
                ]))
                    .then((res) => {
                        if (res.data.status === '1') {
                            let storage = res.data.data && res.data.data.storage;
                            let postData = new FormData();
                            postData.append('file', file);
                            postData.append('type', 'attachment');
                            postData.append('callback_url', JSON.stringify(storage.callback_url));
                            postData.append('object', storage.objects[0]);
                            postData.append('security_token', storage.security_token);
                            upload(postData)
                                .then((res) => {
                                    if (res.data.status === '1') {
                                        this.attachments.push({
                                            index: this.index,
                                            url: res.data.data.url,
                                            name: file.name,
                                        });
                                        this.index = this.index + 1;
                                    } else {
                                        this.$toast.show({
                                            text: this.$t('001815'),
                                        });
                                    }
                                });
                        }
                    });
            }
        },
    },
};
</script>

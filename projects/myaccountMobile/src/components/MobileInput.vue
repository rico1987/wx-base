<template>
    <div
        class="mobile-input"
        :class="{
            'is-diabled': disabled,
            'is-error': showError && firstError
        }"
        :style="{height}"
    >
        <label
            class="mobile-input__label"
            v-if="title"
            v-html="title"
            :style="{
                width: labelWidth || $parent.labelWidth,
                textAlign: $parent.labelAlign,
                marginRight: $parent.labelMarginRight,
            }"
        >
        </label>
        <div class="mobile-input__cell">
            <input
                class="mobile-input__input"
                v-if="!type || type === 'text'"
                type="text"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                @change="$emit('on-change', currentValue)"
                ref="input"
            />
            <input
                class="mobile-input__input"
                v-if="type === 'email'"
                type="email"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                @change="$emit('on-change', currentValue)"
                ref="input"
            />
            <input
                class="mobile-input__input"
                v-if="type === 'number'"
                type="number"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                @change="$emit('on-change', currentValue)"
                ref="input"
            />
            <input
                class="mobile-input__input"
                v-if="type === 'password'"
                type="password"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                @change="$emit('on-change', currentValue)"
                ref="input"
            />
            <input
                class="mobile-input__input"
                v-if="type === 'tel'"
                type="tel"
                :maxlength="max"
                :autocomplete="autocomplete"
                :autocapitalize="autocapitalize"
                :autocorrect="autocorrect"
                :spellcheck="spellcheck"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                @change="$emit('on-change', currentValue)"
                ref="input"
            />
            <span
                class="mobile-input__error"
                v-if="showError && firstError"
            >
                {{firstError}}
            </span>
        </div>
        <div class="mobile-input__right">
            <span
                class="mobile-input__clear"
                v-if="showClear"
                style="cursor: pointer;"
                @click="clear()"
            >
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 51 (57462) - http://www.bohemiancoding.com/sketch -->
                    <title>clear copy</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="密码登录清除按钮" transform="translate(-326.000000, -170.000000)">
                            <rect fill="#FFFFFF" x="0" y="0" width="375" height="727"></rect>
                            <path d="M333.181981,176.474874 L330.707107,174 L330,174.707107 L332.474874,177.181981 L330,179.656854 L330.707107,180.363961 L333.181981,177.889087 L335.656854,180.363961 L336.363961,179.656854 L333.889087,177.181981 L336.363961,174.707107 L335.656854,174 L333.181981,176.474874 Z M333,184 C329.134007,184 326,180.865993 326,177 C326,173.134007 329.134007,170 333,170 C336.865993,170 340,173.134007 340,177 C340,180.865993 336.865993,184 333,184 Z" id="clear-copy" fill="#CCCCCC"></path>
                        </g>
                    </g>
                </svg>
            </span>
            <span class="mobile-input__right-content" v-if="$slots.right">
                <slot name="right"></slot>
            </span>
        </div>
    </div>
</template>
<script>
import Icon from './Icon.vue';

export default {
    name: 'MobileInput',

    componentName: 'MobileInput',

    components: {
        Icon,
    },

    model: {
        prop: 'currentValue',
        event: 'on-change',
    },

    props: {
        height: {
            type: String,
            default: '42pt',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        labelWidth: String,
        type: String,
        max: String,
        showClearBtn: {
            type: Boolean,
            default: true,
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        autocapitalize: {
            type: String,
            default: 'off',
        },
        autocorrect: {
            type: String,
            default: 'off',
        },
        spellcheck: {
            type: String,
            default: 'off',
        },
        name: String,
        placeholder: {
            type: String,
            default: '',
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        requiredMessage: String,
        rules: {
            type: Array,
            default() {
                return [];
            },
        },
        showError: {
            type: Boolean,
            default: true,
        },
        // rules demo
        //
        // [
        //     {
        //         type: 'required',
        //         message: '此字段为必填'
        //     },
        //     {
        //         type: 'regex',
        //         value: /\d[1-9]/,
        //         message: '此字段不符合正则表达式'
        //     },
        //     {
        //         type: 'min-length',
        //         value: 6,
        //         message: '此字段最少6个字符'
        //     },
        //     {
        //         type: 'max-length',
        //         value: 10,
        //         message: '此字段最多10个字符'
        //     },
        // ]
    },

    data() {
        return {
            isFocus: false,
            currentValue: '',
            isValid: true,
            errors: {},
            firstError: null,
        };
    },

    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        },

        showClear() {
            return this.showClearBtn && this.currentValue !== '' && !this.readonly && !this.disabled;
        },
    },
    methods: {
        scrollIntoView(timeout = 100) {
            setTimeout(() => {
                this.$refs.input.scrollIntoViewIfNeeded(true);
            }, timeout);
        },
        focusHandler($event) {
            this.$emit('on-focus', this.currentValue, $event);
            this.errors = {};
            this.isFocus = true;
        },
        blurHandler($event) {
            this.$emit('on-blur', this.currentValue, $event);
            this.isFocus = false;
        },
        keyupHandler($event) {
            if ($event.key === 'Enter') {
                $event.target.blur();
                this.$emit('on-enter', this.currentValue, $event);
            }
        },
        clear() {
            this.currentValue = '';
            this.$refs.input.focus();
            this.$emit('on-clear');
        },
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
        getFirstError() {
            let key = Object.keys(this.errors)[0];
            this.firstError = this.errors[key];
        },
        validate() {
            this.errors = {};

            if (!this.currentValue && this.required) {
                this.isValid = false;
                this.errors.required = this.requiredMessage;
                this.getFirstError();
                return;
            }

            if (this.currentValue && this.required) {
                delete this.errors.required;
            }

            for (let i = 0; i < this.rules.length; i += 1) {
                if (this.rules[i].type === 'required') {
                    if (!this.currentValue) {
                        this.isValid = false;
                        this.errors.required = this.rules[i].message;
                        this.getFirstError();
                        return;
                    } else {
                        delete this.errors.required;
                    }
                } else if (this.rules[i].type === 'regex') {
                    if (!this.currentValue || !this.rules[i].value.test(this.currentValue)) {
                        this.isValid = false;
                        this.errors.regex = this.rules[i].message;
                        this.getFirstError();
                        return;
                    } else {
                        delete this.errors.regex;
                    }
                } else if (this.rules[i].type === 'min-length') {
                    if (this.currentValue.length < this.rules[i].value) {
                        this.isValid = false;
                        this.errors.minLength = this.rules[i].message;
                        this.getFirstError();
                        return;
                    } else {
                        delete this.errors.minLength;
                    }
                } else if (this.rules[i].type === 'max-length') {
                    if (this.currentValue.length > this.rules[i].value) {
                        this.isValid = false;
                        this.errors.maxLength = this.rules[i].message;
                        this.getFirstError();
                        return;
                    } else {
                        delete this.errors.maxLength;
                    }
                }
            }

            this.isValid = true;
        },

    },
};
</script>

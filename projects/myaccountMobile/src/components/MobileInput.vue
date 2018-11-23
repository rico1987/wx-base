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
            <div class="mobile-input__tel-input-wrapper" v-if="type === 'tel'">
                <div
                    class="mobile-input__tel-area-code-selector"
                >
                    <span class="mobile-input__selected-area-code" @click="showAreaCodes = true">
                        {{selectedAreaCode}}
                    </span>
                    <div class="mobile-input__area-code-list" v-show="showAreaCodes">
                        <div class="mobile-input__area-code-search">
                            <input v-model="areaCodeSearch" type="text" />
                            <Icon class="mobile-input__area-code-search-icon" type="search" />
                        </div>
                        <div class="mobile-input__area-code-list-items">
                            <p
                                v-for="areaCode in areaCodes"
                                v-bind:key="areaCode.code + areaCode.country"
                                :class="{active: selectedAreaCode === areaCode.code}"
                            >
                                {{areaCode.country}}
                            </p>
                        </div>
                    </div>
                </div>
                <input
                    class="mobile-input__input"
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
            </div>
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
        areaCodes: {
            type: Array,
            default() {
                return [];
            },
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
            selectedAreaCode: null,
            areaCodeSearch: null,
            showAreaCodes: false,
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

        setActiveAreaCode(areaCode) {
            this.selectedAreaCode = areaCode;
        },
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
            this.firstError = null;

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
        getAreaCode() {
        },
    },
};
</script>

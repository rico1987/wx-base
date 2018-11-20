<template>
    <div
        class="mobile-input"
        :class="{
            'is-diabled': disabled,
        }"
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
                :pattern="pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
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
                :pattern="pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
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
                :pattern="pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
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
                :pattern="pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
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
                :pattern="pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                v-model="currentValue"
                @focus="focusHandler"
                @blur="blurHandler"
                @keyup="keyupHandler"
                ref="input"
            />
        </div>
        <div class="mobile-input__right">
            <Icon
                type="clear"
                v-show="showClear && currentValue !== '' && !readonly && !diabled && isFocus"
                @click.native="clear"
            >
            </Icon>
        </div>
        <div>

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

    props: {
        height: {
            type: String,
            default: '60px',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        labelWidth: String,
        type: String,
        max: Number,
        autocomplete: {
            type: String,
            default: 'off'
        },
        autocapitalize: {
            type: String,
            default: 'off'
        },
        autocorrect: {
            type: String,
            default: 'off'
        },
        spellcheck: {
            type: String,
            default: 'off'
        },
        name: String,
        placeholder: {
            type: String,
            default: ''
        },
        readonly: Boolean,
        disabled: Boolean,
        required: {
            type: Boolean,
            default: false
        },
        requiredMessage: String,
        rules: {
            type: Array,
            default: []
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

    data () {
        return {
            isFocus: false,
            currentValue: '',
            valid: true,
            errors: {},
            firstError: null,
        }
    },

    computed: {
        pattern () {
            if (this.keyboard === 'number' || this.isType === 'china-mobile') {
                return '[0-9]*'
            }
        }
    },
    methods: {
        focusHandler ($event) {},
        blurHandler ($event) {
            this.validate();
            this.isFocus = false;
            this.$emit('on-blur', this.currentValue, $event)
        },
        keyupHandler ($event) {},
        clear () {},
        getFirstError () {
            let key = Object.keys(this.errors)[0];
            this.firstError = this.errors[key];
        },
        validate () {
            this.errors = {};
            if (!this.currentValue && !this.required) {
                this.valid = true;
                return;
            }

            if (!this.currentValue && this.required) {
                this.valid = false
                this.errors.required = this.requiredMessage;
                this.getFirstError();
                return;
            }

            for (let i = 0; i < this.rules.length; i++) {
                if (this.rules[i].type === 'required') {

                } else if (this.rules[i].type === 'regex') {

                } else if (this.rules[i].type === 'min-length') {

                } else if (this.rules[i].type === 'max-length') {

                }
            }
        },

    },
};
</script>

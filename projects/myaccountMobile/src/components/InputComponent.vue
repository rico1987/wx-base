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
            <icon
                type="clear"
            >
            </icon>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'MobileInput',

    componentName: 'MobileInput',

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
            default: '',
        },
        readonly: Boolean,
        disabled: Boolean,

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
        blurHandler ($event) {},
        keyupHandler ($event) {},
    },
};
</script>

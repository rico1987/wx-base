import Vue from 'vue';
import Loading from './loading.vue';

const Mask = Vue.extend(Loading);
const loadingDirective = {};

loadingDirective.install = (Vue) => {
    const toggleLoading = (el, binding) => {
        if (binding.value) {
            Vue.nextTick(() => {
                if (binding.modifiers.fullscreen) {

                }
            });
        } else {

        }
    };

    Vue.directive('loading', {
        bind: function(el, binding, vnode) {
            const loadingText = el.getAttribute('loading-text');
            const loadingSpinner = el.getAttribute('loading-spinner');
            const loadingBackground = el.getAttribute('loading-background');
            const loadingCustomClass = el.getAttribute('loading-custom-class');
            const vm = vnode.context;
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                    text: (vm && vm[loadingText]) || loadingText,
                    spinner: (vm && vm[loadingSpinner]) || loadingSpinner,
                    background: (vm && vm[loadingBackground]) || loadingBackground,
                    customClass: (vm && vm[loadingCustomClass]) || loadingCustomClass,
                    fullscreen: !!binding.modifiers.fullscreen,
                },
            });
            el.instance = mask;
            el.mask = mask.$el;
            el.maskStyle = {};
            binding.value && toggleLoading(el, binding);
        },
        update: function(el, binding) {

        },
        unbind: function() {

        },
    });
};

export default loadingDirective;

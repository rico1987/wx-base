import objectAssign from 'object-assign';
import ToastComponent from '../components/Toast.vue';
import mergeOptions from '../utils/plugin_helper';

let $vm;
let watcher;

const plugin = {
    install(vue, pluginOptions = {}) {
        const Toast = vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div'),
            });
            document.body.appendChild($vm.$el);
        }

        const defaults = {};
        // eslint-disable-next-line
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default;
            }
        }

        const toast = {
            show(options = {}) {
                watcher && watcher();
                if (typeof options === 'string') {
                    mergeOptions($vm, objectAssign({}, pluginOptions, {text: options, }));
                } else if (typeof options === 'object') {
                    mergeOptions($vm, objectAssign({}, pluginOptions, options));
                }
                // eslint-disable-next-line
                if (typeof options === 'object' && options.onShow || options.onHide) {
                    watcher = $vm.$watch('visible', (val) => {
                        val && options.onShow && options.onShow($vm);
                        val === false && options.onHide && options.onHide($vm);
                    });
                }
                $vm.visible = true;
            },
            text(text, position = 'default') {
                this.show({
                    type: 'text',
                    width: 'auto',
                    position,
                    text,
                });
            },

            hide() {
                $vm.visible = false;
            },
            isVisible() {
                return $vm.visible;
            },
        };

        vue.prototype.$toast = toast;
    },
};

export default plugin;
export const install = plugin.install;

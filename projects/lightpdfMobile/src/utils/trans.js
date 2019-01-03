
// 翻译系统 兼容 tr('pdf to owrd@@003333') 在找不到对应的翻译时使用默认值;
// 依赖 'vue-i18n'
// 简单实现
const Trans = {};
Trans.install = function(Vue) {
    Vue.prototype.$tr = function(keyStr) {
        if (!keyStr) {
            return '';
        }
        let old = '';
        let key = '';
        let index = keyStr.indexOf('@@');
        if (index !== -1) {
            old = keyStr.substring(0, index);
            key = keyStr.substring(index + 2, keyStr.lenght);
        } else {
            key = keyStr;
        }
        let value = this.$t(key);
        if (value === key && old.length) {
            value = old;
        }
        return value;
    };
};
// module.exports = Trans;

export default Trans;

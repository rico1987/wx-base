
// 翻译系统 兼容 tr('pdf to owrd@@003333') 在找不到对应的翻译时使用默认值;
// 依赖 'vue-i18n'
// 简单实现
const Trans = {};
Trans.install = function(Vue) {
    Vue.prototype.$tr = function(keyStr, ...rest) {
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
        let arr = [value, ];
        if (rest.length > 0) {
            for (let i = 0; i < rest.length; i += 1) {
                arr.push(rest[i]);
            }
        }
        value = Trans.tr.apply(null, arr);
        return value;
    };
};
Trans.tr = function(str, ...rest) {
    if (rest.length > 0) {
        let reg;
        for (let i = 0; i < rest.length; i += 1) {
            reg = new RegExp(`\\{${i}\\}`, 'g');
            str = str.replace(reg, rest[i]);
        }
    }
    return str;
};
// module.exports = Trans;

export default Trans;

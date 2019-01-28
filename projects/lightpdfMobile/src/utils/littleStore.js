// 简单 localStorage
const Local = {
    head: '_pdf_',
    set: function(key, value) {
        // console.log('--ls-- key:', key, value);
        window.localStorage.setItem(key, value);
    },
    get: function(key) {
        return window.localStorage.getItem(key);
    },
    del: function(key) {
        window.localStorage.removeItem(key);
    },
};

export default Local;

import ls from './littleStore';
import {getNativeData, saveNativeData, } from './index';

// 简单 store proxy
const Local = {
    head: '_pdf_',
    // only for 非对象数据存储 字符串 数字
    set: function(key, value) {
        // let saveData = this.getData();
        // saveData[key] = value;
        // this.setData(saveData);
        this.setDataByKey(key, value);
        ls.set(key, value);
    },
    get: function(key) {
        let saveData = this.getData();
        return saveData[key] || ls.get(key);
    },
    getData: function() {
        return getNativeData();
    },
    setData: function(saveData) {
        saveNativeData(saveData);
    },
    setDataByKey: function(key, value) {
        let saveData = this.getData();
        saveData[key] = value;
        this.setData(saveData);
    },
    del: function(key) {
        let saveDate = this.getData();
        saveDate[key] = null;
        this.setData(saveDate);
        ls.del(key);
    },
};

window.nls = Local;
export default Local;

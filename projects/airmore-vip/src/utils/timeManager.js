// 简单 localStorage
const TimeManager = {
    __timeId: 0,
    __currentTime: 0,
    timerArr: [],
    totalTimer: -1,

    setCurrentTime: function() {
        this.__currentTime = Date.now();
    },
    instance: function() {
        return this;
    },

    timer: function(fun, millisecond, scope) {
        let item = {
            id: this.__timeId += 1,
            fun: fun.bind(scope),
            time: millisecond,
            timestamp: Date.now(),
        };
        return item;
    },

    init: function() {
        if (this.totalTimer !== -1) return;
        this.totalTimer = setInterval(this.timerFun.bind(this), 500);
    },

    timerFun: function() {
        this.setCurrentTime();
        var timerObj;
        for (var i = this.timerArr.length - 1; i >= 0; i -= 1) {
            timerObj = this.timerArr[i];
            if (timerObj && this.__currentTime - timerObj.timestamp >= timerObj.time) {
                timerObj.fun();
                timerObj.timestamp = this.__currentTime;
            }
        }
    },

    addTimer: function(timerObj) {
        this.timerArr.push(timerObj);
    },

    delTimer: function(id) {
        var item;
        for (var i = this.timerArr.length - 1; i >= 0; i -= 1) {
            item = this.timerArr[i];
            if (item && item.id === id) {
                this.timerArr.splice(i, 1);
            }
        }
    },
};
TimeManager.init();
export default TimeManager;

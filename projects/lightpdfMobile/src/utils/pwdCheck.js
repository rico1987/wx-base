const pwdCheck = {
    fileArr: [],
    itemArr: [],
    index: 0,
    eMap: {},
    currentPwd: '',
    isChecking: 0,
    push(file) {
        this.itemArr.push(this.createItem(file));
        if (this.isChecking === 0) {
            this.isChecking = 1;
            this.checkPwd('');
        }
    },
    on(event, func, scope) {
        if (!this.eMap[event]) {
            this.eMap[event] = [];
        }
        this.eMap[event].push(this.createFunObj(func, scope));
        console.log('eMap');
        console.log(this.eMap);
    },
    emit(e, data) {
        if (!this.eMap[e]) {
            return;
        }
        let arr = this.eMap[e];
        for (let i = 0; i < arr.length; i += 1) {
            this.runFun(arr[i], data);
        }
    },
    runFun(funObj, data) {
        if (!funObj || !funObj.fun) {
            return;
        }
        if (funObj.scope) {
            funObj.fun.bind(funObj.scope)(data);
        } else {
            funObj.fun(data);
        }
    },
    createFunObj(fun, scope) {
        return {
            fun: fun,
            scope: scope,
        };
    },
    createItem(file) {
        let obj = {
            file: file,
            pwd: '',
        };
        return obj;
    },
    checkPwd(pwd) {
        this.currentPwd = pwd;
        let file = this.itemArr[this.index].file;
        this.checkInfo(file);
    },
    checkInfo(file) {
        window.wpdf.getPdfInfo({
            password: this.currentPwd,
            file: file,
        }, this.pdfInfoBack, this);
    },
    pdfInfoBack(data) {
        console.log(data);
        let item = this.itemArr[this.index];
        let file = this.itemArr[this.index].file;
        if (data.errType === 'PasswordException') {
            this.emit('pwd-err', file);
            return;
        }
        if (data.errType === 'InvalidPDFException') {
            this.emit('pdf-err', file);
            return;
        }
        item.pwd = this.currentPwd;
        this.emit('pdf-ok', item);
        this.next();
    },
    next() {
        this.index += 1;
        if (this.index > this.itemArr.length - 1) {

            this.emit('pwd-finish');
            this.itemArr = [];
            this.index = 1;
            this.pwd = '';
            this.isChecking = 0;
            return;
        }
        let item = this.itemArr[this.index];
        this.checkInfo(item.file);
    },
};

export default pwdCheck;

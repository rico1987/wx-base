'use strict';
(function ($) {

    window.wpdf = {
        initPDFJS: function() {
            var CDN_ROOT = './static/js';
            PDFJS.workerSrc = CDN_ROOT + "/pdf.js/js/pdf.worker.js";
            PDFJS.cMapUrl = CDN_ROOT + "/pdf.js/cmaps/";
            PDFJS.cMapPacked = true;
            console.log("xxxxxx");
        },
            // 获取pdf的信息，页码 是否需要密码
        getPdfInfo: function(opt,callback,scope){
            // {
            // 	url: 'http://xxxxx',
            // 	data: Uint8Array,
            // 	file: File,
            // 	password: '',
            // }
            // url,data,file,三者取其一
            if(!opt)return;
            
            var options={};
            options.password = opt.password||'';
            opt.url?options.url = opt.url:null;
            opt.data?options.data = opt.data:null;
            if(opt.file){
                var reader = new FileReader()
                reader.onload = function(e) {
                    var buffer = e.target.result
                    var uint8 = new Uint8Array(buffer)
                    options.data = uint8;
                    this.getPdfDocument(options,callback,scope);
                }.bind(this)
                reader.readAsArrayBuffer(opt.file)
                return;
            }
            if(!opt.data && !opt.url) return;
            this.getPdfDocument(options,callback,scope);
        },
        getPdfDocument: function(options,callback,scope){
            var obj={};
            PDFJS.getDocument(options).then(function(pdf) {
                obj.pdf = pdf;
                obj.password = options.password;
                callback.bind(scope)(obj);
                    pdf.getPage(1).then(function(page) {
                    });
    
            }.bind(this),function(err){
                obj.err = err;
                obj.errType = err.name;
                callback.bind(scope)(obj);
            })
        },
    };
    window.wpdf.initPDFJS();
})();


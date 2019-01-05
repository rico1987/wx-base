'use strict';
(function ($) {
    window.ossUploader = function(file,authorizefun,successfun,errorfun,progressfun,scope,attachment){

        function OssUploader(file,authorizefun,successfun,errorfun,progressfun,scope,attachment){
            this.attachment = attachment;
            this.file = file;
            this.authorizefun = authorizefun;
            this.successfun = successfun;
            this.errorfun = errorfun;
            this.progressfun = progressfun;
            this.scope = scope;
            
        }
        OssUploader.prototype = {
            fileAuthorizeSuccess: function(data){
                this.uploadToOss(data,this.file);
                if(this.authorizefun){
                    this.authorizefun.bind(this.scope)();
                }
            },
    
            fileAuthorizeError: function(data){
                this.errorfun.bind(this.scope)(data)
            },
    
            uploadToOss: function(data, file){
                var con = data.data
                 var timeout = con['expires_in']
                 var url = con['callback_url']
                 var obj = {
                    region: con['region'],
                    accessKeyId: con['access_id'],
                    accessKeySecret: con['access_secret'],
                    bucket: con['bucket'],
                    secure: true,
                    stsToken: con['security_token'],
                    endpoint: con['endpoint'],
                }
                 if(obj){
                     //6.0.1
                    var client = new OSS(obj)
                 }
    
                var progress = this.progressfun?this.progressfun.bind(this.scope):null;
    
                var timestamp = Date.parse(new Date())
                var fileStr = con.objects[file.name];
                var key = fileStr;
                var callback = {
                    url: url.callbackUrl,
                    body: url.callbackBody,
                }
                var contentDisposition = '';
                if(this.attachment){
                    contentDisposition = 'attachment;filename="'+encodeURIComponent(file.name)+'"';
                }
                client.multipartUpload(key,  file,{
                    cancelFlag: true,
                    callback: callback,
                    progress: progress,
                    headers:{
                        'Content-Disposition': contentDisposition,
                    }
                }).then(this.uploadOssOk.bind(this)).catch(function(ress){
                    this.errorfun.bind(this.scope)(ress);
                }.bind(this));
    
            },
    
            uploadOssOk: function(res){
                var data = res.data;
                this.successfun.bind(this.scope)(res,this.file);
            },
    
            start: function(){
                if(!this.file){
                    return;
                }
                pdf.getFileAuthorization([this.file],this.fileAuthorizeSuccess, this.fileAuthorizeError, this);
            }
        };
    
        return new OssUploader(file,authorizefun,successfun,errorfun,progressfun,scope,attachment);
    }
})();

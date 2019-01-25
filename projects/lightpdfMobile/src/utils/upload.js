
// 简单 localStorage
import { getFileAuthorization, } from '../api/pdf';

function OssUploader(file, authorizefun, successfun, errorfun, progressfun, scope, attachment) {
    this.attachment = attachment;
    this.file = file;
    this.authorizefun = authorizefun;
    this.successfun = successfun;
    this.errorfun = errorfun;
    this.progressfun = progressfun;
    this.scope = scope;

}
OssUploader.prototype = {
    fileAuthorizeSuccess: function(data) {
        this.uploadToOss(data, this.file);
        if (this.authorizefun) {
            this.authorizefun.bind(this.scope)();
        }
    },

    fileAuthorizeError: function(data) {
        this.errorfun.bind(this.scope)(data);
    },
    uploadToOss2: function(data, file) {
        data;
        file;
    },
    uploadToOss: function(data, file) {
        let _this = this;
        var con = data.data.data;
        var url = con['callback_url'];
        var obj = {
            region: con['region'],
            accessKeyId: con['access_id'],
            accessKeySecret: con['access_secret'],
            bucket: con['bucket'],
            secure: true,
            stsToken: con['security_token'],
            endpoint: con['endpoint'],
        };
        if (obj) {
            // 6.0.1
            // eslint-disable-next-line
            var client = new OSS(obj);
        }

        var progress = this.progressfun ? this.progressfun.bind(this.scope) : null;

        // var timestamp = Date.parse(new Date());
        var fileStr = con.objects[file.name];
        var encodeName = encodeURIComponent(file.name);
        var key = fileStr;
        var callback = {
            url: url.callbackUrl,
            body: `${url.callbackBody}&x:original_name=${file.name}`,
        };
        console.log(callback);
        console.log('-----------------');
        var contentDisposition = '';
        if (this.attachment) {
            // contentDisposition = 'attachment;filename="' + encodeURIComponent(file.name) +
            //     '"';
            contentDisposition = `attachment;filename="${encodeName}"`;
        }
        client.multipartUpload(key, file,
            {
                cancelFlag: true,
                callback: callback,
                progress: progress,
                headers: {
                    'Content-Disposition': contentDisposition,
                },
            })
            .then(_this.uploadOssOk.bind(_this))
            .catch(_this.errorfun);

    },

    uploadOssOk: function(res) {
        // var data = res.data;
        this.successfun.bind(this.scope)(res, this.file);
    },

    start: function() {
        if (!this.file) {
            return;
        }
        // getFileAuthorization([this.file, ], this.fileAuthorizeSuccess, this.fileAuthorizeError, this);
        let _this = this;
        console.log(_this);
        getFileAuthorization([this.file, ])
            .then((data) => {
                _this.fileAuthorizeSuccess(data);
            })
            .catch((data) => {
                _this.fileAuthorizeError(data);
            });
    },
};
const Uploader = {
    create: function(file, authorizefun, successfun, errorfun, progressfun, scope, attachment) {
        return new OssUploader(file, authorizefun, successfun, errorfun, progressfun, scope,
            attachment);
    },
};
export default Uploader;

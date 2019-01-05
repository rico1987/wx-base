
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

    fileAuthorizeError: (data) => {
        this.errorfun.bind(this.scope)(data);
    },

    uploadToOss: (data, file) => {
        var con = data.data;
        // var timeout = con['expires_in'];
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
        var key = fileStr;
        var callback = {
            url: url.callbackUrl,
            body: url.callbackBody,
        };
        var contentDisposition = '';
        if (this.attachment) {
            // contentDisposition = 'attachment;filename="' + encodeURIComponent(file.name) +
            //     '"';
            contentDisposition = `attachment;filename="${encodeURIComponent(file.name)}"`;
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
            .then(this.uploadOssOk.bind(this))
            .catch(this.errorfun);

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
        getFileAuthorization([this.file, ])
            .then(this.fileAuthorizeSuccess)
            .catch(this.fileAuthorizeError);
    },
};
const Uploader = {
    create: function(file, authorizefun, successfun, errorfun, progressfun, scope, attachment) {
        return new OssUploader(file, authorizefun, successfun, errorfun, progressfun, scope,
            attachment);
    },
};
export default Uploader;

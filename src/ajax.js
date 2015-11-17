/*========================================================================*/
+function (exports) {
    /**
     * author:ying.xia@yeepay.com
     * phone:13520114380
     * lastModifiedDate:2015.10.20
     * plugName:ajax
     * description:处理ajax请求
     */
    'use strict';
    var version = '1.0.0';

    function ajax(options) {
        var _options = {
            async: true,
            method: "GET",
            url: location.href,
            data: "",
            username: "",
            password: "",
            timeout: 5000,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        if (typeof options == "object") {
            for (var key in options) {
                _options[key] = options[key];
            }
        }
        _options.formData = typeof _options.formData == "string" ? _options.formData = document.querySelector("#" + _options.formData) : _options.formData;
        var xhr = new XMLHttpRequest();
        var formData = typeof _options.formData ? new FormData(_options.formData) : _options.formData;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    typeof _options.success == "function" ? _options.success(xhr.responseText, xhr.status, xhr) : false;
                } else {
                    typeof _options.error == "function" ? _options.error(xhr.status, xhr) : false;
                }
            }

        }
        xhr.timeout = _options.timeout;
        xhr.ontimeout = _options.timeoutCallback || null;
        /*var dataStr = "";

        +function _generator() {//数据转换成字符串发送给服务器
            var step = 0;
            for (var key in _options.data) {
                if (step) {
                    dataStr += "&" + key + "=" + _options.data[key];
                } else {
                    step++;
                    dataStr += key + "=" + _options.data[key];
                }
            }
            if (_options.formData) {
                for (var attr in _options.data) {
                    formData.appendChild(attr, _options.data[attr]);
                }
            }
        }();*/
        if (_options.method == "GET") {
            dataStr != "" ? xhr.open(_options.method, _options.url + "?" + _options.data, _options.async) : xhr.open(_options.method, _options.url, _options.async);
            xhr.setRequestHeader("Content-Type",_options.contentType);
            xhr.send();
        } else {
            xhr.open(_options.method, _options.url, _options.async);
            xhr.setRequestHeader("Content-Type",_options.contentType);
            if (_options.formData) {
                xhr.send(formData);
                return;
            }
            xhr.send(_options.data);
        }
    }

    exports.fn.ajax = ajax;
}(exports);
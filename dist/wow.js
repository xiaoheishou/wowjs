/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.11.11
     * description:命名空间，最顶层对象，W是唯一对外接口，继承exports
     */
    'use strict';
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    typeof exports === "function" ? exports : window.exports = function () {
    }
    exports.fn = exports.prototype;
    exports.fn.register = function (name, extend, coverride) {//注册一个对象
        /**
         * @param [name] string 对象名称
         * @param [extend] object 继承的父类
         * @param [coverride] boolean 是否强制覆盖已经存在的对象，默认不覆盖
         *        true强制覆盖
         *        如果不强制覆盖且对象已经存在，抛出错误说明并记录到控制台
         */
        var extend = extend || {};
        var coverride = typeof coverride == "undefined" ? false : coverride;
        if (coverride) {
            this.__proto__[name] = Object.create(extend);
        } else {
            if (typeof this[name] == "undefined") {
                this.__proto__[name] = Object.create(extend);
            } else {
                console.error(name + "\u5BF9\u8C61\u521B\u5EFA\u5931\u8D25\uFF0C\u56E0\u4E3A\u5DF2\u7ECF\u5B58\u5728" + name + "\u5C5E\u6027\uFF0C" + name + "\u5C5E\u6027\u7C7B\u578B\u4E3A" + typeof this[name] + "\uFF0C" + "\u503C\u7B49\u4E8E" + this[name]);
            }
        }
    }
    Object.freeze(exports);
    window.W = Object.create(exports.fn);
    Object.freeze(W);
}();
/*========================================================================*/
+function (exports) {
    /**
     * author:wow_contact@163.com
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
/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.10.12
     * plugName:clear
     * description:清空输入框内容
     */
    'use strict';
    var version = '1.0.0';
    var clears = document.body.querySelectorAll('input ~ .clear');
    for (var i = 0, l = clears.length; i < l; i++) {
        clears[i].addEventListener("click", function () {
            this.previousElementSibling.value = "";
        }, false);
    }
}();
/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.11.11
     * plugName:dom
     * description:DOM操作
     */
    'use strict';
    function _dom(selector) {
        if (this.constructor.name !== "_dom") {
            return new _dom(selector);
        }
        var elements = document.querySelectorAll(selector);
        var domFactory = [];
        for (var i = 0, l = elements.length; i < l; i++) {
            domFactory.push(elements[i]);
        }
        Array.prototype.push.apply(this, domFactory);
        return this;
    }

    _dom.prototype.forEach = function (fn) {
        var i = this.length - 1;
        for (; i >= 0; i--) {
            fn.call(this[i], i, this[i]);
        }
    }
    _dom.prototype.hide = function () {
        this.forEach(function () {
            this.style.display = "none";
        });
    }
    exports.fn.Dom = _dom;
}();
/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.11.09
     * plugName:format
     * description:输入框数字格式化，默认4位一空格
     */
    'use strict';
    var version = '1.0.0';
    //获取格式化元素
    var inputs = document.body.querySelectorAll('input[data-format="true"]');
    for (var i = 0, l = inputs.length; i < l; i++) {
        inputs[i].addEventListener("keyup", _bindHandler, false);
        _bindHandler.call(inputs[i], event, "auto");
    }
    function _bindHandler(event, type) {
        var digit = Math.round(this.dataset.digit) || 4;
        if (this.value.length <= digit) {
            return;
        }
        format.call(this, event, digit, type);
    }

    function format(event, digit, type) {
        /**
         * @param [digit] 空格位数
         */
        if (type == "auto" || ((event.which < 37 || event.which > 40) && event.which !== 8)) {
            var str = this.value.replace(/[\s\n\r]/g, "");
            var len = str.length;
            var array = [];
            var start = 0;
            for (var i = 0; i < Math.ceil(len / digit); i++) {
                array.push(str.substr(start, digit));
                start += digit;
            }
            this.value = array.join(" ");
        }
    }
}();
/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.11.09
     * plugName:keyboard
     * description:输入框调用键盘类型
     */
    'use strict';
    var version = '1.0.0';
    var inputs = document.body.querySelectorAll('input[data-key-type]');
    for (var i = 0, l = inputs.length; i < l; i++) {
        inputs[i].addEventListener("focus", function () {
            var initial = this.type,
                keyType = this.dataset.keyType;
            this.type = keyType;
            setTimeout(restore.bind(this, initial), 5)
        }, false);
    }
    function restore(initial) {
        this.type = initial;
    }

}();
/*========================================================================*/
+function (exports) {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.10.20
     * plugName:loading
     * description:请求等待友情提示
     */
    'use strict';

    var version = '1.0.0';


    function loading(content, cls, boolTitle, boolClose, title, close) {
        var cls = cls || "pme-loading";
        var boolTitle = boolTitle || false;
        var boolClose = boolClose || false;
        exports.fn.Popup.base(content, cls, boolTitle, boolClose, title, close);
    }

    exports.fn.loading = loading;
}(exports);
/*========================================================================*/
+function (exports) {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.10.26
     * plugName:popup
     * description:弹出窗
     */
    'use strict';

    var version = '1.0.0';

    function popup() {

    }

    function _createMask() {//创建半透明蒙版
        var mask = document.querySelector(".pme-mask");
        if (mask) {
            mask.style.display = "block";
        } else {
            document.body.insertAdjacentHTML('beforeend', '<div class="pme-mask"></div>');
        }
    }

    function _close() {//关闭警告信息
        document.body.removeChild(document.querySelector(".pme-mask"));
        document.body.removeChild(document.querySelector(".pme-popup"));
    }

    function _bindClose() {//绑定关闭事件
        document.querySelector(".pme-popup .close-btn").addEventListener("click", function () {
            _close();
        }, false);
    }

    function _position() {//弹窗定位
        var clientWindow = document.documentElement.clientHeight;
        var popup = document.querySelector(".pme-popup");
        var content = document.querySelector(".pme-popup .content-wrapper");
        var popupWindow = popup.offsetHeight;
        if (popupWindow < clientWindow) {
            popup.style.top = "50%";
            popup.style.marginWp = popupWindow / -2 + "px";
        } else {
            popup.classList.add("scroll");
            content.style.height = (popup.offsetHeight - popup.querySelector("h2").offsetHeight) + "px";
        }
        content.focus();
        popup.classList.add("show");
    }

    popup.prototype.base = function (content, cls, boolTitle, boolClose, title, close) {
        /**
         * @param [content] string 弹层显示内容
         * @param [cls] string 附加的样式名
         * @param [boolTitle] boolean 是否显示一个标题
         * @param [boolClose] boolean 是否显示关闭按钮
         * @param [title] string 标题文本
         * @param [close] string 关闭文本
         * */
        _createMask();
        if (document.querySelector(".pme-popup")) {
            document.body.removeChild(document.querySelector(".pme-popup"));
        }
        var title = title || "提示";
        var close = close || "确定";
        var wrapper = document.createElement("div");
        typeof cls != "undefined" ? wrapper.className = "pme-popup " + cls : wrapper.className = "pme-popup";
        if (boolTitle || typeof boolTitle == "undefined") {
            if (boolClose || typeof boolClose == "undefined") {
                var closeBtn = '<span class="close" onclick="W.Popup.close()">' + close + '</span>';
            } else {
                var closeBtn = "";
            }
            wrapper.insertAdjacentHTML('afterBegin', '<h2>' + title + closeBtn + '</h2>');
        }
        wrapper.insertAdjacentHTML('beforeend', '<div class="content-wrapper" tabindex="-1">' + content + '</div>');
        document.body.appendChild(wrapper);
        _position();

    }
    popup.prototype.close = function () {
        _close();
    }
    popup.prototype.alert = function (content) {//创建警告信息 @param [content] 信息内容
        var html = '<div class="content">' + content + '</div><button class="close-btn">确定</button>';
        popup.prototype.base(html, "pme-alert", true, false);
        _bindClose();
    }
    exports.fn.Popup = new popup();
}(exports);
/*========================================================================*/
+function () {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.10.28
     * plugName:serialize
     * description:表单序列化成一个字符串
     */
    'use strict';
    var version = '1.0.0';

    function serialize(form) {//表单序列化
        var str = "";
        var reg = /text|tel|password|hidden|number|time|date|month/;
        var form = typeof form == "string" ? document.querySelector("#" + form) : form;
        var inputs = form.elements;
        for (var i = 0, l = inputs.length; i < l; i++) {
            if (reg.test(inputs[i].type) && inputs[i].name != "") {
                if (Boolean(str)) {
                    str += "&" + inputs[i].name + "=" + inputs[i].value;
                } else {
                    str += inputs[i].name + "=" + inputs[i].value;
                }
            }
        }
        return str;
    }

    exports.fn.serialize = serialize;
}();
/*========================================================================*/
+function (exports) {
    /**
     * author:wow_contact@163.com
     * phone:13520114380
     * lastModifiedDate:2015.10.23
     * plugName:ui-errorMsg
     * description:显示错误信息
     */
    'use strict';
    var version = '1.0.0';
    exports.fn.register("ui");
    function errorMsg(msg, root, bool) {
        /**
         * @param [root] object 插入错误信息的根元素 默认页面第一个表单
         * @param [msg] string 错误信息
         * @param [bool] boolean 是否自动消失
         * */
        var root = root || document.body;
        var msg = msg || "信息有误";
        var div = document.querySelector("#pme-errorMsg");
        if (div) {
            div.textContent = msg;
            root.insertBefore(div, root.firstChild);
        } else {
            div = document.createElement("div");
            div.id = "pme-errorMsg";
            div.textContent = msg;
            root.insertBefore(div, root.firstChild);
        }
        div.classList.remove("hide");
        if (bool || typeof bool == "undefined") {
            errorMsg.hide();
        }
        return errorMsg;
    }

    function hide(time) {
        var time = time || 2500;
        setTimeout(function () {
            try {
                document.querySelector("#pme-errorMsg").classList.add("hide");
            } catch (e) {
                //
            }
        }, time);
    }

    exports.fn.ui.errorMsg = errorMsg;
    exports.fn.ui.errorMsg.hide = hide;
}(exports);
/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
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
            this[name] = Object.create(extend);
        } else {
            if (typeof this[name] == "undefined") {
                this[name] = Object.create(extend);
            } else {
                console.error(name + "\u5BF9\u8C61\u521B\u5EFA\u5931\u8D25\uFF0C\u56E0\u4E3A\u5DF2\u7ECF\u5B58\u5728" + name + "\u5C5E\u6027\uFF0C" + name + "\u5C5E\u6027\u7C7B\u578B\u4E3A" + typeof this[name] + "\uFF0C" + "\u503C\u7B49\u4E8E" + this[name]);
            }
        }
    }
    Object.freeze(exports);
    window.W = Object.create(exports.fn);
    Object.freeze(W);
}();
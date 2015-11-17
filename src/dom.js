/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
     * phone:13520114380
     * lastModifiedDate:2015.11.11
     * plugName:dom
     * description:DOM操作
     */
    'use strict';
    function _dom(selector) {
        if (this.constructor.name !== "_dom" || this === "undefined") {
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

    _dom.prototype.each = function (method) {
        for (var i = 0, l = this.length; i < l; i++) {
            method.call(this[i], i, this[i]);
        }
    }
    exports.fn.Dom = _dom;
}();
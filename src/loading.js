/*========================================================================*/
+function (exports) {
    /**
     * author:ying.xia@yeepay.com
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
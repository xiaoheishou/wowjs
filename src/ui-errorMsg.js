/*========================================================================*/
+function (exports) {
    /**
     * author:ying.xia@yeepay.com
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
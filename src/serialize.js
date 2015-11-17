/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
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
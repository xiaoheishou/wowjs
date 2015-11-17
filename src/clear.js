/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
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
/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
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
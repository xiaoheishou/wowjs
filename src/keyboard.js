/*========================================================================*/
+function () {
    /**
     * author:ying.xia@yeepay.com
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
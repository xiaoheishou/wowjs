/*========================================================================*/
+function (exports) {
    /**
     * author:ying.xia@yeepay.com
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
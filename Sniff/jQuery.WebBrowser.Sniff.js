/*
*  Plugin to get basic browser information
*  jQuery.Browser is removed in 1.9.1. This plugin uses the same basic premis to get the browser type and version
*  Requires jQuery 1.6.2+
*/
(function($) {
    $.WebBrowser = {
        Sniff: function() {
            $.WebBrowser.Info = _sniffInfo();
            function _sniffInfo() {
                var userAgent = navigator.userAgent.toLowerCase();
                /*Array of browsers and how to search for them in navigator.userAgent string
                * Enter each browser as an array: [browser identifier, version identifier, browser delimeter, version delimeter ]
                * Entered in order to avoid chrome showing as safari
                */
                var webBrowsers = [["chrome", "chrome", " ", "/"], ["android", "android", ";", " "], ["safari", "version", " ", "/"], ["msie", "msie", ";", " "], ["firefox", "firefox", " ", "/"]]
                var browser = {};
                $.each(webBrowsers, function(key, wb) {
                    if (userAgent.indexOf(wb[0]) != -1) {
                        browser[wb[0]] = true;
                        browser.browser = wb[0];
                        $.each(userAgent.split(wb[2]), function(k, ua) {
                            if (ua.indexOf(wb[1]) != -1) {
                                browser.version = $.trim(ua).split(wb[3])[1];
                                return false; //
                            }
                        });
                        return false;
                    }
                });
                if (browser.browser == null) {
                    browser.undetected = true;
                    browser.browser = "undetected";
                    browser.version = "0";
                }
                return browser;
            }
        },
        Info: null
    }
    if ($.WebBrowser.Info == null) {
        $.WebBrowser.Sniff(); //just do it!
    }
})(jQuery);
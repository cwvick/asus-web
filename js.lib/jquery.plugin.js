/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */ (function ($) {
    var types = ["DOMMouseScroll", "mousewheel"];
    if ($.event.fixHooks) for (var i = types.length; i;) $.event.fixHooks[types[--i]] = $.event.mouseHooks;
    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var i = types.length; i;) this.addEventListener(types[--i], handler, false);
            else this.onmousewheel = handler
        },
        teardown: function () {
            if (this.removeEventListener) for (var i = types.length; i;) this.removeEventListener(types[--i], handler, false);
            else this.onmousewheel = null
        }
    };
    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
        },
        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn)
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if (orgEvent.wheelDelta) delta = orgEvent.wheelDelta / 120;
        if (orgEvent.detail) delta = -orgEvent.detail / 3;
        deltaY = delta;
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta
        }
        if (orgEvent.wheelDeltaY !== undefined) deltaY = orgEvent.wheelDeltaY / 120;
        if (orgEvent.wheelDeltaX !== undefined) deltaX = -1 * orgEvent.wheelDeltaX / 120;
        args.unshift(event, delta, deltaX, deltaY);
        return ($.event.dispatch || $.event.handle).apply(this, args)
    }
})(jQuery);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

/**
 */
 (function ($, e, b) {
	    var c = "hashchange",
	        h = document,
	        f, g = $.event.special,
	        i = h.documentMode,
	        d = "on" + c in e && (i === b || i > 7);

	    function a(j) {
	        j = j || location.href;
	        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
	    }
	    $.fn[c] = function (j) {
	        return j ? this.bind(c, j) : this.trigger(c)
	    };
	    $.fn[c].delay = 50;
	    g[c] = $.extend(g[c], {
	        setup: function () {
	            if (d) {
	                return false
	            }
	            $(f.start)
	        },
	        teardown: function () {
	            if (d) {
	                return false
	            }
	            $(f.stop)
	        }
	    });
	    f = (function () {
	        var j = {}, p, m = a(),
	            k = function (q) {
	                return q
	            }, l = k,
	            o = k;
	        j.start = function () {
	            p || n()
	        };
	        j.stop = function () {
	            p && clearTimeout(p);
	            p = b
	        };

	        function n() {
	            var r = a(),
	                q = o(m);
	            if (r !== m) {
	                l(m = r, q);
	                $(e).trigger(c)
	            } else {
	                if (q !== m) {
	                    location.href = location.href.replace(/#.*/, "") + q
	                }
	            }
	            p = setTimeout(n, $.fn[c].delay)
	        }
	        $.browser.msie && !d && (function () {
	            var q, r;
	            j.start = function () {
	                if (!q) {
	                    r = $.fn[c].src;
	                    r = r && r + a();
	                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
	                        r || l(a());
	                        n()
	                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
	                    h.onpropertychange = function () {
	                        try {
	                            if (event.propertyName === "title") {
	                                q.document.title = h.title
	                            }
	                        } catch (s) {}
	                    }
	                }
	            };
	            j.stop = k;
	            o = function () {
	                return a(q.location.href)
	            };
	            l = function (v, s) {
	                var u = q.document,
	                    t = $.fn[c].domain;
	                if (v !== s) {
	                    u.title = h.title;
	                    u.open();
	                    t && u.write('<script>document.domain="' + t + '"<\/script>');
	                    u.close();
	                    q.location.hash = v
	                }
	            }
	        })();
	        return j
	    })()
	})(jQuery, this);
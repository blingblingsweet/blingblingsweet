$.fn.animClass = function(a) {
    var b = $(this).removeClass(a);
    setTimeout(function() {
        b.addClass(a)
    }, 50)
};
! function() {
    window.animFx = !1;
    var a = navigator.userAgent,
        b = a.match(/Android[^]+?;/g);
    if (a.indexOf("iPhone") >= 0)
        window.animFx = !0;
    else if (a.indexOf("Android") >= 0 && b) {
        var c = b[0].substring(8, b[0].length - 1),
            d = c.split("."),
            e = d[0] + "." + d[1];
        e >= 4 && (window.animFx = !0)
    }
}();
Utils = {
    addTip: function(a) {
        var b = a.hit === !1 ? "" : '<div class="hit" style="border-top-color: ' + a.bgColor + '"></div>';
        return $("<div " + (a.id ? "id=" + a.id : "") + ' class="tip" style="background-color:' + a.bgColor + '"><span class="content">' + a.content + "</span>" + b + "</div>").appendTo(a.container).css(a.style)
    },
    addTip2: function(a) {
        function b() {
            return $('<div class="tip-2 hit-' + a.pos + '">' + a.content + '<div class="hit" style="border-top-color: ' + a.bgColor + '"></div></div>').appendTo(a.container).css({
                left: a.left + "px",
                top: a.top + "px",
                right: a.right + "px",
                bottom: a.bottom + "px",
                backgroundColor: a.bgColor,
                color: a.color || "#000"
            }).addClass("tip-2-do-anim")
        }
        var c = a.delay || 0;
        return c ? void setTimeout(function() {
            b()
        }, c) : b()
    },
    arraySum: function(a) {
        var b = 0;
        return a.forEach(function(a) {
            b += a
        }), b
    },
    angle2radian: function(a) {
        return a / 180 * Math.PI
    },
    once: function(a) {
        var b = a;
        return function() {
            b(), b = function() {
                return !1
            }
        }
    }
};
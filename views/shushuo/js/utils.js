define(['zepto'], function($) {
    Utils = {
        addTip: function(opt) {
            var hit = opt.hit === false ? "" : '<div class="hit" style="border-top-color: ' + opt.bgColor + '"></div>',
                id = opt.id ? "id=" + opt.id : "",
                tipObj = $("<div " + id + ' class="tip" style="background-color:' + opt.bgColor + '"><span class="content">' + opt.content + "</span>" + hit + "</div>");
            return tipObj.appendTo(opt.container).css(opt.style)
        },
        addTip2: function(opt) {
            function render() {
                var tipObj = $('<div class="tip-2 hit-' + opt.pos + '">' + opt.content + '<div class="hit" style="border-top-color: ' + opt.bgColor + '"></div></div>')
                return tipObj.appendTo(opt.container).css({
                    left: opt.left + "px",
                    top: opt.top + "px",
                    right: opt.right + "px",
                    bottom: opt.bottom + "px",
                    backgroundColor: opt.bgColor,
                    color: opt.color || "#000"
                }).addClass("tip-2-do-anim")
            }
            var delay = opt.delay || 0;

            // return delay ? void setTimeout(function() {
            //     b()
            // }, delay) : b()

            if(delay) {
                setTimeout(function() {
                    render()
                }, delay)
            } else {
                render()
            }
            return false;
        },
        arraySum: function(array) {
            var sum = 0;
            array.forEach(function(x) {
                sum += x
            })
            return sum
        },
        angle2radian: function(angle) {
            return angle / 180 * Math.PI
        },
        once: function(func) {
            var f = func;
            return function() {
                f()
                f = function() {
                    return false
                }
            }
        }

    };
    return Utils;
});
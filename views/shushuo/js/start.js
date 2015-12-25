define(['zepto'], function($) {

    // var ua = window.navigator.userAgent.toLowerCase(),
    //     isAndroid = /android/i.test(ua),
    //     isIOS = /iphone|ipad|ipod/i.test(ua);

    window.animFx = false;
    var ua = navigator.userAgent,
        androidUA = ua.match(/Android[^]+?;/g);
    if (ua.indexOf("iPhone") >= 0)
        window.animFx = !0;
    else if (ua.indexOf("Android") >= 0 && androidUA) {
        var ver = androidUA[0].substring(8, androidUA[0].length - 1),
            verArr = ver.split("."),
            majorVer = verArr[0] + "." + verArr[1];
        if (majorVer >= 4) {
            window.animFx = true
        }

    }

    var p8Init = function() {
        $(".p8-content .g").css({
            webkitTransform: "translate3d(0px, 0px, 0px)",
            opacity: 1
        })
    }

    function renderChart(index) {
        switch (index) {
            case 0:
                break;
            case 1:
                Charts.get("donut").init();
                break;
            case 2:
                var pie = $(".pie");
                pie.height(pie.width());
                var pieChart = Charts.get("pie");
                pieChart.init("pie-1", [47, 73], "通信&<br>社交")
                pieChart.init("pie-2", [33, 44], "娱乐")
                pieChart.init("pie-3", [44, 24], "工具")
                pieChart.init("pie-4", [19, 17], "其他")
                break;
            case 3:
                Utils.once(function() {
                    Charts.get("column").init()
                    var swiper = new Swiper(".scroll-container2", {
                        scrollContainer: true,
                        onTouchEnd: b
                    })
                    swiper.wrapperTransitionEnd(b, true), setTimeout(function() {
                        $(".scroll-container2 .swiper-wrapper").css({
                            webkitTransition: "3.5s"
                        })
                        swiper.setWrapperTranslate(-520, 0, 0)
                    }, 800)
                })();
                break;
            case 4:
                Charts.get("bubble").init();
                break;
            case 5:
                Charts.get("p-donut").init();
                break;
            case 6:
                Charts.get("round").init();
                break;
            case 7:
                p8Init()
        }
    }

    var bodyHeight = $("body").height();
    // 458 > e && (e = 458);
    if (bodyHeight < 458)
        bodyHeight = 458;

    var titleStrArr = ["<h1>智能机大盘：</h1>指智能机全体保有量中的日活跃（当天发生过至少一次联网行为的）设备数量", "<h1>日使用时长：</h1>指用户一天24小时中使用各类智能机应用的累计时长，不含短信和电话", "<h1>说明：</h1>娱乐类应用：包括游戏、视频、音乐和阅读类应用<br/>工具类应用：包括搜索、浏览器、地图导航、应用分发、办公/学习/生活工具、系统/安全/优化工具等", "<h1>说明：</h1>阿里：除阿里自有应用外，UC浏览器、高德地图等收购公司的应用也被纳入统计<br/>搜狐：腾讯入股搜狗后，搜狗继续作为搜狐的子公司独立运营，故仍将其纳入搜狐进行统计<br/>新浪：阿里入股新浪微博后，微博继续作为新浪子公司独立运营，故仍将其纳入新浪进行统计", "<h1>百度移动搜索MAU</h1>当月通过手机百度客户端或手机浏览器等方式使用过百度移动搜索的用户（包括Android、iPhone及其他系统平台）"],
        pageHasShown = [false, false, false, false, false, false, false, false];


    new Swiper("#pages", {
        mode: "vertical",
        resistance: "100%",
        slidesPerView: "auto",
        moveStartThreshold: 80,
        speed: 1e3,
        onSlideChangeEnd: function(e) {
            var index = e.activeIndex;
            // return pageHasShown[index] ? false : (pageHasShown[index] = true, void renderChart(index))
            pageHasShown[index] = pageHasShown[index] ? false : true
            renderChart(index)
        }
    })


    var alert = $("#alert"),
        msgWindow = $(".msg-window", alert);
    $(".swiper-slide").on("touchstart", ".toggle-tips", function() {
        var that = $(this),
            dataN = that.data("n"),
            title = titleStrArr[dataN];
        alert.find(".msg-content").html(title)
        alert.show()
        setTimeout(function() {
            msgWindow.css({
                webkitTransition: "500ms",
                webkitTransform: "translate3d(0px, -149px, 0px)",
                opacity: 1
            })
        }, 0)
    })

    alert.on("touchstart", ".btn-ok", function() {
        msgWindow.css({
            webkitTransition: "200ms",
            webkitTransform: "translate3d(0px, 0px, 0px)",
            opacity: 0
        }), setTimeout(function() {
            alert.hide()
        }, 200)
    })

    $(document).ready(function() {
        function preventDefault(e) {
            e.preventDefault()
        }
        document.addEventListener("touchstart", preventDefault, false)
        document.addEventListener("touchmove", preventDefault, false)
    })

    $(".swiper-slide").height(bodyHeight);

    var areaGridWidth = 40;
    $("#area").height(300).width(800);
    $(".area-grid").width(areaGridWidth);
    $(".area-container").width(document.body.clientWidth - areaGridWidth).css({
        overflow: "hidden",
        marginLeft: areaGridWidth + "px"
    });

    var columnGridWidth = 40;
    $("#column").height(270).width(800);
    $(".column-grid").width(columnGridWidth);
    $(".column-container").width(document.body.clientWidth - columnGridWidth).css({
        overflow: "hidden",
        marginLeft: columnGridWidth + "px"
    });

    var titleArr = $(".title"),
        titleMarginBottomArr = [439, 439, 439, 499, 439, 439, 439, 439];
    for (var i = 0; 8 > i; i++)
        $(titleArr[i]).css({
            marginBottom: (bodyHeight - titleMarginBottomArr[i]) / 2
        });

    var cover = $("#cover");
    cover.hammer().bind("panup", function() {
        cover.css({
            webkitTransition: "600ms",
            webkitTransform: "translate3d(0px, " + -bodyHeight + "px, 0px)",
            zoom: 1
        })
        setTimeout(function() {
            Utils.once(function() {
                Charts.get("area").init();
                var swiper = new Swiper(".scroll-container", {
                    scrollContainer: true,
                    scrollbar: {
                        container: ".scroll-scrollbar"
                    }
                });
                setTimeout(function() {
                    $(".scroll-container .swiper-wrapper").css({
                        webkitTransition: "2s"
                    })
                    swiper.setWrapperTranslate(-200, 0, 0)
                    setTimeout(function() {
                        swiper.setWrapperTranslate(-520, 0, 0)
                    }, 1500)
                }, 800)
            })()
        }, 500)
    });

    $("#page1").hammer().bind("pandown", function() {
        cover.css({
            webkitTransform: "translate3d(0px, 0px, 0px)"
        })
    });

    var pages = $("#pages");
    $("#page8").hammer().bind("panup", function() {
        r.css({
            webkitTransition: "500ms",
            webkitTransform: "translate3d(0px, " + -e + "px, 0px)"
        })
    })

    $("#bcover").hammer().bind("pandown", function() {
        pages.css({
            webkitTransform: "translate3d(0px, 0px, 0px)"
        })
    });

    // window.DeviceMotionEvent && window.addEventListener("devicemotion", d, false), 
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        console.log("Not supported on your device.");
    }

    var img1 = $("#img1"),
        img2 = $("#img2"),
        img3 = $("#img3");

    function deviceMotionHandler(e) {
        var acceleration = e.accelerationIncludingGravity;
        if (Math.abs(acceleration.x) < 2 && Math.abs(acceleration.y) < 2)
            return false;

        var x = 3 * -(0 | acceleration.x);
        img1.css({
            webkitTransform: "translate3d(" + x + "px,0px,0px)"
        }, 0)
        img2.css({
            webkitTransform: "translate3d(" + x + "px,0px,0px)"
        }, 0);

        var y = -25 + 10 * acceleration.x / Math.PI;
        img3.css({
            webkitTransform: "rotateY(" + y + "deg)"
        })
    }

    // a() || ($(".weixin").hide(), $(".book").css({
    //     display: "block",
    //     margin: "25px auto 25px"
    // })),
    function isMicroMessenger() {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0
    }

    // 如果不是微信浏览器
    if (!isMicroMessenger()) {
        $(".weixin").hide()
        $(".book").css({
            display: "block",
            margin: "25px auto 25px"
        })
    }

    // 最后一页点击分享按钮
    $("#pdf-link").hammer().on("tap", function() {
        var link = "http://mp.weixin.qq.com/s?__biz=MzA5NjQ4MzkyMw==&mid=200884994&idx=1&sn=266858ef60ab2a26484c67076511c109&3rd=MzA3MDU4NTYzMw==&scene=6#rd";
        window.open(link, "_blank")
    })

    document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.on("menu:share:appmessage", function() {
            WeixinJSBridge.invoke("sendAppMessage", {
                img_width: 300,
                img_height: 300,
                img_url: "shushuo.baidu.com.mobile2014Q2.images/weixin_pic.jpg",
                link: "http://shushuo.baidu.com/act/webtrend/",
                desc: "2014Q2百度移动互联网发展趋势报告",
                title: "2014Q2百度移动互联网发展趋势报告"
            })
        }), WeixinJSBridge.on("menu:share:timeline", function() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_width: 300,
                img_height: 300,
                img_url: "shushuo.baidu.com.mobile2014Q2.images/weixin_pic.jpg",
                link: "http://shushuo.baidu.com/act/webtrend/",
                desc: "2014Q2百度移动互联网发展趋势报告",
                title: "2014Q2百度移动互联网发展趋势报告"
            })
        })
    })
});
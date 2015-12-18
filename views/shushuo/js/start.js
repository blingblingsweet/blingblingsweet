 /*! script.js 08-12 15:38 */
 function start() {
     function a() {
         return navigator.userAgent.toLowerCase().indexOf("micromessenger") >= 0
     }

     function b() {
         var a = $("#tip-fixed"),
             b = f.getWrapperTranslate("x");
         if (-30 > b) {
             var c = -b - 240;
             0 > c && (c = 0), a.css("webkitTransform", "translate3d(" + c + "px, 0px, 0px)")
         }
     }

     function c(a) {
         switch (a) {
             case 0:
                 break;
             case 1:
                 Charts.get("donut").init();
                 break;
             case 2:
                 var c = $(".pie");
                 c.height(c.width());
                 var d = Charts.get("pie");
                 d.init("pie-1", [47, 73], "通信&<br>社交"), d.init("pie-2", [33, 44], "娱乐"), d.init("pie-3", [44, 24], "工具"), d.init("pie-4", [19, 17], "其他");
                 break;
             case 3:
                 Utils.once(function() {
                     Charts.get("column").init(), f = new Swiper(".scroll-container2", {
                         scrollContainer: !0,
                         onTouchEnd: b
                     }), f.wrapperTransitionEnd(b, !0), setTimeout(function() {
                         $(".scroll-container2 .swiper-wrapper").css({
                             webkitTransition: "3.5s"
                         }), f.setWrapperTranslate(-520, 0, 0)
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
                 i()
         }
     }

     function d(a) {
         var b = a.accelerationIncludingGravity;
         if (Math.abs(b.x) < 2 && Math.abs(b.y) < 2)
             return !1;
         var c = 3 * -(0 | b.x);
         s.css({
             webkitTransform: "translate3d(" + c + "px,0px,0px)"
         }, 0), t.css({
             webkitTransform: "translate3d(" + c + "px,0px,0px)"
         }, 0);
         var d = -25 + 10 * b.x / Math.PI;
         u.css({
             webkitTransform: "rotateY(" + d + "deg)"
         })
     }
     var e = $("body").height();
     458 > e && (e = 458);
     var f, g = ["<h1>智能机大盘：</h1>指智能机全体保有量中的日活跃（当天发生过至少一次联网行为的）设备数量", "<h1>日使用时长：</h1>指用户一天24小时中使用各类智能机应用的累计时长，不含短信和电话", "<h1>说明：</h1>娱乐类应用：包括游戏、视频、音乐和阅读类应用<br/>工具类应用：包括搜索、浏览器、地图导航、应用分发、办公/学习/生活工具、系统/安全/优化工具等", "<h1>说明：</h1>阿里：除阿里自有应用外，UC浏览器、高德地图等收购公司的应用也被纳入统计<br/>搜狐：腾讯入股搜狗后，搜狗继续作为搜狐的子公司独立运营，故仍将其纳入搜狐进行统计<br/>新浪：阿里入股新浪微博后，微博继续作为新浪子公司独立运营，故仍将其纳入新浪进行统计", "<h1>百度移动搜索MAU</h1>当月通过手机百度客户端或手机浏览器等方式使用过百度移动搜索的用户（包括Android、iPhone及其他系统平台）"],
         h = [!1, !1, !1, !1, !1, !1, !1, !1],
         i = function() {
             $(".p8-content .g").css({
                 webkitTransform: "translate3d(0px, 0px, 0px)",
                 opacity: 1
             })
         },
         j = (new Swiper("#pages", {
             mode: "vertical",
             resistance: "100%",
             slidesPerView: "auto",
             moveStartThreshold: 80,
             speed: 1e3,
             onSlideChangeEnd: function(a) {
                 var b = a.activeIndex;
                 return h[b] ? !1 : (h[b] = !0, void c(b))
             }
         }), $("#alert")),
         k = $(".msg-window", j);
     $(".swiper-slide").on("touchstart", ".toggle-tips", function() {
         var a = $(this),
             b = a.data("n"),
             c = g[b];
         j.find(".msg-content").html(c), j.show(), setTimeout(function() {
             k.css({
                 webkitTransition: "500ms",
                 webkitTransform: "translate3d(0px, -149px, 0px)",
                 opacity: 1
             })
         }, 0)
     }), j.on("touchstart", ".btn-ok", function() {
         k.css({
             webkitTransition: "200ms",
             webkitTransform: "translate3d(0px, 0px, 0px)",
             opacity: 0
         }), setTimeout(function() {
             j.hide()
         }, 200)
     }), $(document).ready(function() {
         function a(a) {
             a.preventDefault()
         }
         document.addEventListener("touchstart", a, !1), document.addEventListener("touchmove", a, !1)
     }), $(".swiper-slide").height(e);
     var l = 40;
     $("#area").height(300).width(800), $(".area-grid").width(l), $(".area-container").width(document.body.clientWidth - l).css({
         overflow: "hidden",
         marginLeft: l + "px"
     });
     var m = 40;
     $("#column").height(270).width(800), $(".column-grid").width(m), $(".column-container").width(document.body.clientWidth - m).css({
         overflow: "hidden",
         marginLeft: m + "px"
     });
     for (var n = $(".title"), o = [439, 439, 439, 499, 439, 439, 439, 439], p = 0; 8 > p; p++)
         $(n[p]).css({
             marginBottom: (e - o[p]) / 2
         });
     var q = $("#cover");
     q.hammer().bind("panup", function() {
         q.css({
             webkitTransition: "600ms",
             webkitTransform: "translate3d(0px, " + -e + "px, 0px)",
             zoom: 1
         }), setTimeout(function() {
             Utils.once(function() {
                 Charts.get("area").init();
                 var a = new Swiper(".scroll-container", {
                     scrollContainer: !0,
                     scrollbar: {
                         container: ".scroll-scrollbar"
                     }
                 });
                 setTimeout(function() {
                     $(".scroll-container .swiper-wrapper").css({
                         webkitTransition: "2s"
                     }), a.setWrapperTranslate(-200, 0, 0), setTimeout(function() {
                         a.setWrapperTranslate(-520, 0, 0)
                     }, 1500)
                 }, 800)
             })()
         }, 500)
     }), $("#page1").hammer().bind("pandown", function() {
         q.css({
             webkitTransform: "translate3d(0px, 0px, 0px)"
         })
     });
     var r = $("#pages");
     $("#page8").hammer().bind("panup", function() {
         r.css({
             webkitTransition: "500ms",
             webkitTransform: "translate3d(0px, " + -e + "px, 0px)"
         })
     }), $("#bcover").hammer().bind("pandown", function() {
         r.css({
             webkitTransform: "translate3d(0px, 0px, 0px)"
         })
     });
     var s = $("#img1"),
         t = $("#img2"),
         u = $("#img3");
     window.DeviceMotionEvent && window.addEventListener("devicemotion", d, !1), a() || ($(".weixin").hide(), $(".book").css({
         display: "block",
         margin: "25px auto 25px"
     })), $("#pdf-link").hammer().on("tap", function() {
         var a = "http://mp.weixin.qq.com/s?__biz=MzA5NjQ4MzkyMw==&mid=200884994&idx=1&sn=266858ef60ab2a26484c67076511c109&3rd=MzA3MDU4NTYzMw==&scene=6#rd";
         window.open(a, "_blank")
     }), document.addEventListener("WeixinJSBridgeReady", function() {
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
 }
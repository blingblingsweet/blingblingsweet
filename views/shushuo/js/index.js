define([
  'zepto',
  './backgroundRender'
], function($, fss){
  // function(a) {
  //     function b(a) {
  //         "100%" == a && 0 == i && (i = !0, d())
  //     }
  //     function c() {
  //     }
  //     function d() {
  //         $("#loading").hide(), a()
  //     }
  //     var e = ["shushuo.baidu.com.mobile2014Q2.images/1-bg.jpg", "shushuo.baidu.com.mobile2014Q2.images/back-cover.jpg", "shushuo.baidu.com.mobile2014Q2.images/book.png", "shushuo.baidu.com.mobile2014Q2.images/donuts.png", "shushuo.baidu.com.mobile2014Q2.images/logos.png", "shushuo.baidu.com.mobile2014Q2.images/numbers.png", "shushuo.baidu.com.mobile2014Q2.images/p-donut.png", "shushuo.baidu.com.mobile2014Q2.images/pics1.png", "shushuo.baidu.com.mobile2014Q2.images/pics2.png", "shushuo.baidu.com.mobile2014Q2.images/pie-bg.png", "shushuo.baidu.com.mobile2014Q2.images/share.png"], f = "0%", g = 0, h = e.length, i = !1, j = 3e3;
  //     e.forEach(function(a) {
  //         var d = new Image;
  //         d.onload = function() {
  //             g++, f = (g / h * 100).toFixed(0) + "%", b(f), c(f)
  //         }, d.src = a
  //     }), setTimeout(function() {
  //         b("100%")
  //     }, j)
  // }(start);

  fss.initialise();


  var initialize = function(){
    // Pass in our Router module and call it's initialize function

  }

  return {
    initialize: initialize
  };

});
define(['jquery', 'jqParallax'], function($) {
	var w, h;
w = $(window).width(), h = $(window).height(), $("#banner").width(w).height(h);
	resize();

	if ("home" != $("body").data("nav"))
		$("html,body").animate({
			scrollTop: h + "px"
		});

	var img = new Image;
	img.src = $(".banner").attr("src")
	if (img.complete)
		$(".loading").fadeOut()
	else
		img.onload = function() {
			$(".loading").fadeOut()
		}

	function resize() {
		w = $(window).width(), h = $(window).height(),
			$("#banner").width(w).height(h);

		var e = 3840 / 1900,
			t = h + 100,
			n = t * e;
		w + 100 > n && (n = w + 100, t = 1900 / 3840 * n);
		var i = (n - w) / 2,
			r = (t - h) / 2;

		$(".banner").each(function() {
			var e = $(this);
			e.css({
				height: t + "px",
				width: n + "px",
				marginLeft: -i + "px",
				marginTop: -r + "px"
			})
		})
	}
	$(window).resize(function() {
		resize();
	});

	$parallax = $("#banner").parallax(),

	$(window).scroll(function() {
		h = $(window).height();
		var scoll = $(this).scrollTop();
		scoll >= h ? $parallax.parallax("disable") : $parallax.parallax("enable")
	});

	function tips() {
		setInterval(function() {
			$("#subtitle").fadeOut(function() {
				$(this).html(TIPS[Math.random() * TIPS.length >> 0])
				$(this).fadeIn()
			})
		}, 1e4)
	}

	tips();

	return false;
});

// var a = "ontouchstart" in window,
// 	s = a ? "touchstart" : "click";
// $("link[rel='prev']").size() > 0 && $(document).keydown(function(e) {
// 	37 == e.keyCode && (location.href = $("link[rel='prev']").attr("href"))
// }), $("link[rel='next']").size() > 0 && $(document).keydown(function(e) {
// 	39 == e.keyCode && (location.href = $("link[rel='next']").attr("href"))
// }), $("#bars").on(s, function() {
// 	"none" == $("#category").css("display") ? $(this).css("color", "#69AD65") : $(this).css("color", "#999"), $("#category").toggle()
// }), $("[data-week]").each(function(e) {
// 	var t = $(this),
// 		n = t.data("week"),
// 		i = {
// 			1: "星期一",
// 			2: "星期二",
// 			3: "星期三",
// 			4: "星期四",
// 			5: "星期五",
// 			6: "星期六",
// 			0: "星期日"
// 		};
// 	t.html(i[n])
// });


// var l = $("#search"),
// 	u = function() {
// 		var e = $.trim(l.find("input").val());
// 		return "" == e ? (l.tooltip("show"), setTimeout(function() {
// 			l.tooltip("destroy")
// 		}, 3e3), l.find("input").focus(), !1) : (e = e.replace(/\'/gi, ""), e = e.replace(/\"/gi, ""), e = e.replace(/\?/gi, ""), e = e.replace(/\%/gi, ""), e = e.replace(/\./gi, ""), e = e.replace(/\*/gi, ""), void(location.href = PATH + "search/" + encodeURI(e) + "/"))
// 	};
// if (l.find("i").on("click", function(e) {
// 		e.preventDefault(), u()
// 	}), l.find("input").on("keydown", function(e) {
// 		13 == e.keyCode && u()
// 	}), null != cookie("nickname") && $("#comment-nickname").val(cookie("nickname")), null != cookie("email") && $("#comment-email").val(cookie("email")), $("#comment-content").click(function() {
// 		$("#comment-info").slideDown()
// 	}), $("#comment-button").on("click", function(e) {
// 		e.preventDefault();
// 		var t = $(this),
// 			n = t.html(),
// 			i = t.data("post-id"),
// 			r = t.data("category-id"),
// 			o = t.data("parent-id"),
// 			a = t.data("interval-timeout"),
// 			s = (t.data("type"), $.trim($("#comment-content textarea").val()));
// 		if ("" == s) return show_tip("发表内容不能为空", 3, 300), $("#comment-content textarea").focus(), !1;
// 		s = encodeURI(s);
// 		var l = encodeURI($.trim($("#comment-nickname").val()));
// 		if ("" == l) return show_tip("昵称不能为空", 3, 300), $("#comment-nickname").focus(), !1;
// 		var u = encodeURI($.trim($("#comment-email").val()));
// 		if ("" == u) return show_tip("邮箱不能为空", 3, 300), $("#comment-email").focus(), !1;
// 		if (!/^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test(u)) return show_tip("邮箱不合法", 3, 300), $("#comment-email").focus(), !1;
// 		var c = PATH + "api.php?action=post&do=comment",
// 			p = {
// 				content: s,
// 				post_id: i,
// 				category_id: r,
// 				parent_id: o,
// 				nickname: l,
// 				email: u
// 			};
// 		t.html("Waiting..."), $.post(c, p, function(e) {
// 			if (t.html(n), 2 == e.result.error) return show_tip("发布间隔必须大于" + a + "分钟", 3, 300), !1;
// 			if (e.success) {
// 				var i = "请等待管理员审核您的评论";
// 				"0" == t.data("check") && (i = "发布成功"), show_tip(i, 3, 300), $("#comment-content textarea").val(""), cookie("nickname", $.trim($("#comment-nickname").val()), {
// 					expires: 365
// 				}), cookie("email", $.trim($("#comment-email").val()), {
// 					expires: 365
// 				})
// 			}
// 		})
// 	}), $(document).on("click", ".reply", function() {
// 		var e = $(this),
// 			t = e.data("id");
// 		$("#comment-button").attr("data-parent-id", t), $("#comment-content textarea").focus()
// 	}), $(".post-comment").data("post-id")) {
// 	var c;
// 	if (void 0 != $(".post-comment").data("user-id")) c = PATH + "api.php?action=user&do=comment-data";
// 	else {
// 		var p = $(".post-comment").data("post-id");
// 		c = PATH + "api.php?action=post&do=comment&post_id=" + p
// 	}
// 	$.getJSON(c, function(e) {
// 		e.success && ($("#comment-loop").html(template("__comment", e.result)), $(".pagination").wisePagination({
// 			total: e.result.count,
// 			size: e.result.size,
// 			callback: function(e) {
// 				$.getJSON(c + "&page=" + e, function(e) {
// 					e.success && $("#comment-loop").html(template("__comment", e.result))
// 				})
// 			}
// 		}))
// 	})
// }
// tips()
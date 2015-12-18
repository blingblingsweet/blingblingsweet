var Charts = {
    _all: {},
    add: function(a, b) {
        this._all[a] = b
    },
    get: function(a) {
        return this._all[a]
    }
};
! function() {
    var a = {
        color: ["#87e0b7"],
        xAxis: {
            categories: ["12Q2", "12Q3", "12Q4", "13Q1", "13Q2", "13Q3", "13Q4", "14Q1", "14Q2"],
            ticks: {
                enabled: !1
            },
            margin: {
                right: 10,
                left: 5
            },
            axis: {
                enabled: !1
            },
            padding: {
                left: 10,
                right: 10
            },
            label: {
                enabled: !0,
                rotate: 0,
                font: {
                    color: "#FFF",
                    fontSize: 10
                }
            },
            min: 0
        },
        yAxis: {
            min: 0,
            grid: [0, 1, 2, 3, 4, 5],
            ticks: {
                enabled: !1
            },
            label: {
                enabled: !1,
                rotate: 0,
                font: {
                    color: "#FFF",
                    fontSize: 10
                }
            },
            axis: {
                enabled: !1
            },
            padding: {
                top: 0,
                bottom: 0
            }
        },
        plotOptions: {
            area: {
                stroke: {
                    width: 6
                },
                fill: {
                    grandient: [{
                        pos: 0,
                        opacity: 1,
                        color: "#d4c071"
                    }, {
                        pos: 1,
                        opacity: 0,
                        color: "#d4c071"
                    }]
                },
                dot: {
                    enabled: !1
                }
            },
            line: {
                width: 6,
                dot: {
                    enabled: !1
                }
            },
            label: {
                enabled: !1
            }
        },
        legend: {
            enabled: !1
        },
        interaction: {
            onHover: null
        },
        series: [{
            name: "中国智能手机",
            data: [1.2, 1.63, 2.33, 2.79, 2.88, 3.27, 3.85, 4.43, 4.63]
        }],
        animation: {
            enabled: !1
        }
    };
    Charts.add("area", {
        init: function() {
            function b(a, b) {
                var c = new kity.Path,
                    d = c.getDrawer(),
                    f = 0,
                    g = a.length;
                for (f = 0; g > f; f++)
                    d.moveTo(a[f][0], a[f][1]), d.lineTo(b[g - f - 1][0], b[g - f - 1][1]);
                var h = (new kity.LinearGradientBrush).pipe(function() {
                    this.addStop(0, "#dccfa7", 1), this.addStop(1, "#dccfa7", 0), this.setStartPosition(0, 0), this.setEndPosition(0, 1), e.addResource(this)
                });
                c.stroke(h), e.addShape(c), c.bringRear()
            }
            var c = $('<div id="area-inner" style="position:relative;width:100%;height:100%"></div>');
            $("#area").append(c);
            var d = new kc.AreaChart("area-inner");
            d.getPlots().drawPolygon = function(a, c) {
                var d = this,
                    e = a.concat(a.slice(0).reverse()).slice(0),
                    f = a.concat(c).slice(0),
                    g = d.config.plotOptions.area.fill.grandient,
                    h = new kc.Polyline({
                        points: e,
                        color: "#ddd",
                        width: 0,
                        factor: +new Date,
                        animatedDir: "y",
                        close: !0,
                        fill: g
                    });
                this.addElement("area", h), h.update(), setTimeout(function() {
                    h.update({
                        points: f,
                        color: "#ddd",
                        width: 0,
                        factor: +new Date,
                        animatedDir: "y",
                        close: !0,
                        fill: g
                    })
                }), b(a, c), h.polyline.container.bringRear()
            };
            var e = d.getPaper();
            d.update(a);
            var f = d.getPlots().getPlotsElements().getElementList()[0],
                g = (new kity.LinearGradientBrush).pipe(function() {
                    this.addStop(0, "#a7df1e", 1), this.addStop(1, "#7be1f0", 1), this.setStartPosition(0, 0), this.setEndPosition(1, 0), e.addResource(this)
                }),
                h = new kity.Pen;
            h.setWidth(6), h.setColor(g), f.stroke(g, 6), Utils.addTip2({
                bgColor: "#e9df38",
                left: 25,
                top: 125,
                pos: "left",
                container: c,
                content: '普及率<div style="font-size:16px">10%</div>',
                delay: 500
            }), Utils.addTip2({
                bgColor: "#e9df38",
                left: 301,
                top: 60,
                pos: "left",
                container: c,
                content: '普及率<div style="font-size:16px">20%</div>',
                delay: 1600
            }), Utils.addTip2({
                bgColor: "#e9df38",
                left: 684,
                top: 0,
                pos: "left",
                container: c,
                content: '普及率<div style="font-size:16px">30%</div>',
                delay: 3300
            }), this.init = function() {
                return !1
            }
        }
    })
}(),
function() {
    function a(a) {
        var b = a.coordinate.param.margin,
            c = a.getWidth() - b.left - b.right,
            d = a.coordinate.param.x,
            e = a.coordinate.measurePointY(0);
        a.addElement("zero", new kc.Line({
            x1: d,
            y1: e,
            x2: d + c,
            y2: e,
            width: 1,
            color: "#FFF"
        })).update()
    }

    function b(a) {
        var b = a.coordinate.param.margin,
            c = a.getHeight() - b.top - b.bottom,
            d = a.coordinate.measurePointX(3.5),
            e = a.coordinate.param.y;
        a.addElement("separate", new kc.Line({
            x1: d,
            y1: e,
            x2: d,
            y2: e + c,
            width: 1,
            color: "#FFF",
            dash: [1]
        })).update()
    }
    var c = {
        color: ["#3ed58c", "#f4dd1a"],
        xAxis: {
            categories: ["浏览器", "生活娱乐", "社交&通信", "新闻", "地图导航", "音乐", "搜索", "视频", "阅读", "电商", "生活服务", "云存储", "游戏"],
            ticks: {
                enabled: !1
            },
            margin: {
                right: 10,
                left: 5
            },
            axis: {
                enabled: !1
            },
            padding: {
                left: 20,
                right: 20
            },
            label: {
                enabled: !0,
                rotate: 0,
                font: {
                    color: "#FFF",
                    fontSize: 10
                }
            },
            min: 0
        },
        yAxis: {
            min: 0,
            ticks: {
                enabled: !1
            },
            grid: [-.3, 0, .3, .6, .9],
            label: {
                enabled: !1,
                rotate: 0,
                font: {
                    color: "#FFF",
                    fontSize: 10
                },
                format: function(a) {
                    return parseInt(100 * a) + "%"
                }
            },
            axis: {
                enabled: !1
            },
            padding: {
                top: 0,
                bottom: 0
            }
        },
        plotOptions: {
            column: {
                width: 16,
                margin: 1
            },
            label: {
                enabled: !1
            }
        },
        legend: {
            enabled: !1
        },
        interaction: {
            onStickHover: null
        },
        animation: {
            enabled: window.animFx,
            duration: 1500,
            mode: "ease",
            delayInterval: 200
        },
        series: [{
            name: "Android",
            data: [-.230560572, -.116267018, -.022364046, -.055284462, .12, .144067376, .196909265, .237930968, .270339733, .45, .6, .106499724, .35]
        }, {
            name: "iPhone",
            data: [-.24, -.12, -.1, -.05, .03, .175265871, .3, .31440714, .31440714, .384934529, .42, .51, .67]
        }]
    };
    Charts.add("column", {
        init: function() {
            var d = $("#column"),
                e = new kc.ColumnChart("column");
            e.update(c), a(e), b(e), Utils.addTip({
                hit: !1,
                container: d,
                content: "跑输大盘：<br />应用DAU增速<用户大盘增速",
                bgColor: "#1074c8",
                style: {
                    left: "35px",
                    top: "20px",
                    width: "160px"
                }
            }), Utils.addTip({
                hit: !1,
                id: "tip-fixed",
                container: d,
                content: "跑赢大盘：<br />应用DAU增速>用户大盘增速",
                bgColor: "#1074c8",
                style: {
                    left: "270px",
                    top: "20px",
                    width: "160px",
                    webkitTransition: "0.3s"
                }
            })
        }
    })
}(),
function() {
    function a(a) {
        b.plotOptions.pie.outerRadius = a, b.plotOptions.pie.innerRadius = a - 50
    }
    var b = {
            color: ["#3ed58c", "#f4dd1a", "#7dd5d6", "#a8e0df"],
            plotOptions: {
                pie: {
                    shadow: {
                        enabled: !1,
                        size: 4,
                        x: 0,
                        y: 0,
                        color: "rgba( 0, 0, 0, 0.3 )"
                    },
                    innerRadius: 40,
                    outerRadius: 90,
                    incrementRadius: 30,
                    stroke: {
                        width: 0
                    }
                },
                label: {
                    enabled: !1
                }
            },
            legend: {
                enabled: !1,
                level: "data"
            },
            animation: {
                enabled: window.animFx,
                duration: 600,
                mode: "ease"
            }
        },
        c = {
            "11Q2": {
                name: "11Q2",
                position: 0,
                data: [{
                    name: "iPhone",
                    value: 5
                }, {
                    name: "Android",
                    value: 14
                }, {
                    name: "Windows",
                    value: 8
                }, {
                    name: "Others",
                    value: 73
                }]
            },
            "12Q2": {
                name: "12Q2",
                position: 1,
                data: [{
                    name: "iPhone",
                    value: 8
                }, {
                    name: "Android",
                    value: 45
                }, {
                    name: "Windows",
                    value: 3
                }, {
                    name: "Others",
                    value: 43
                }]
            },
            "13Q2": {
                name: "13Q2",
                position: 2,
                data: [{
                    name: "iPhone",
                    value: 12
                }, {
                    name: "Android",
                    value: 73
                }, {
                    name: "Windows",
                    value: 1
                }, {
                    name: "Others",
                    value: 14
                }]
            },
            "14Q2": {
                name: "14Q2",
                position: 3,
                data: [{
                    name: "iPhone",
                    value: 13
                }, {
                    name: "Android",
                    value: 79
                }, {
                    name: "Windows",
                    value: 2
                }, {
                    name: "Others",
                    value: 6
                }]
            }
        };
    Charts.add("donut", {
        init: function() {
            function d(a) {
                b.series = [a], m.html(a.name).animClass("beat"), i.update(b);
                var c = document.getElementById("p2-highlight");
                c.style.webkitTransform = "translate3d(" + 49 * a.position + "px, 0px, 0px)";
                var d = i.getPlots().pies.param.list,
                    f = ["right", "left"];
                if (!j) {
                    j = [];
                    for (var g = 0; 2 > g; g++)
                        j.push(Utils.addTip2({
                            bgColor: "#116165",
                            color: "#FFF",
                            left: l.x,
                            top: l.y,
                            pos: f[g],
                            container: e,
                            content: n[g] + '<div style="font-size:16px">4%</div>',
                            delay: 0
                        }).css({
                            webkitTransition: "0.5s"
                        }))
                }
                if (!k) {
                    k = [];
                    for (var g = 0; 2 > g; g++)
                        k.push($('<div class="donut-label">11</div>').appendTo(e).css({
                            position: "absolute",
                            opacity: 0,
                            webkitTransition: "0.5s",
                            left: l.x + "px",
                            top: l.y + "px"
                        }))
                }
                setTimeout(function() {
                    d.forEach(function(b, c) {
                        var d, e = b.outerRadius + 4,
                            g = Math.min(b.startAngle + 25, b.startAngle + b.pieAngle / 2),
                            h = (g - 90) / 180 * Math.PI,
                            i = e * Math.cos(h),
                            l = e * Math.sin(h);
                        1 >= c && (d = j[c].html(n[c] + '<div style="font-size:16px">' + a.data[c].value + '%<div class="hit" style="border-top-color:#116165"></div></div></div>'), d.css({
                            webkitTransform: "translate3d(" + (i - ("left" == f[c] ? 0 : d.width())) + "px, " + (l - d.height() - 8) + "px, 0px)"
                        })), c > 1 && (d = k[c - 2].html(n[c]), d.css({
                            webkitTransform: "translate3d(" + (g > 0 && 180 > g ? i : i - d.width()) + "px, " + (l - 8) + "px, 0px)",
                            opacity: 1
                        }))
                    })
                }, b.animation.duration / Math.min(++o, 2))
            }
            var e = $("#donut"),
                f = e.width(),
                g = e.height(),
                h = 40,
                i = new kc.PieChart("donut");
            a(Math.min(f, g) / 2 - h), i.setConfig(b), i.setOption("plotOptions.pie.center", {
                x: f / 2,
                y: g / 2
            });
            var j, k, l = i.getCenter(),
                f = 100,
                g = 100,
                m = $("<div></div>").css({
                    width: f + "px",
                    height: g + "px",
                    color: "#FFF",
                    position: "absolute",
                    left: l.x - f / 2 + "px",
                    top: l.y - g / 2 + "px",
                    textAlign: "center",
                    lineHeight: g + "px"
                }).appendTo($("#donut")[0]),
                n = ["iPhone", "Android", "Windows", "其他"],
                o = 0;
            $(".qselect li").on("touchstart", function() {
                d(c[this.innerHTML])
            });
            var p = 0;
            for (var q in c)
                ! function(a) {
                    setTimeout(function() {
                        d(c[a])
                    }, 1500 * p)
                }(q), p++
        }
    })
}(),
function() {
    function a(a) {
        return d * a
    }

    function b() {
        e = {
            plotOptions: {
                pie: {
                    innerRadius: a(26),
                    outerRadius: a(38),
                    incrementRadius: a(12),
                    stroke: {
                        width: 0
                    },
                    shadow: {
                        enabled: !1,
                        size: 1,
                        x: 0,
                        y: 0,
                        color: "rgba( 0, 0, 0, 0.3 )"
                    }
                },
                label: {
                    enabled: !1
                }
            },
            legend: {
                enabled: !1
            },
            animation: {
                enabled: window.animFx,
                duration: 1e3,
                mode: "ease"
            }
        }
    }

    function c(a, b, c) {
        var d = a.getCenter(),
            e = 40,
            f = 32,
            g = $("<div></div>").css({
                width: e + "px",
                height: f + "px",
                color: "#FFF",
                position: "absolute",
                left: d.x - e / 2 + "px",
                top: d.y - f / 2 + "px",
                textAlign: "center",
                lineHeight: c.indexOf("<br") >= 0 ? "16px" : "33px",
                fontSize: "10px"
            }).appendTo($("#" + b)[0]);
        g.html(c)
    }
    var d = 1,
        e = {};
    Charts.add("pie", {
        init: function(f, g, h) {
            var i = new kc.PieChart(f),
                j = $("#" + f),
                k = j.width(),
                l = j.height();
            d = j.width() / 100 * .95, j.css("backgroundSize", a(100)), b();
            var m = {
                x: k / 2,
                y: l / 2
            };
            e.plotOptions.pie.center = m, e.series = [{
                name: "Android",
                data: [{
                    value: g[0],
                    color: "#3ed58c"
                }, {
                    value: 100 - g[0],
                    color: "rgba(0,0,0,0)"
                }]
            }, {
                name: "iPhone",
                data: [{
                    value: g[1],
                    color: "#f4dd1a"
                }, {
                    value: 100 - g[1],
                    color: "rgba(0,0,0,0)"
                }]
            }], i.update(e), c(i, f, h);
            var n = i.getPlots().pies.param.list;
            setTimeout(function() {
                n.forEach(function(a, b) {
                    if (b % 2 == 0) {
                        var c = (a.innerRadius + a.outerRadius) / 2,
                            d = (a.startAngle + a.pieAngle - 90) / 180 * Math.PI,
                            e = c * Math.cos(d) + m.x - 6,
                            f = c * Math.sin(d) + m.y - 6;
                        $('<div class="pie-num">' + g[b / 2] + "</div>").appendTo(j).css({
                            left: e + "px",
                            top: f + "px"
                        })
                    }
                })
            }, e.animation.duration + 300)
        }
    })
}(),
function() {
    function a(a) {
        var b = a.container,
            c = a.side,
            d = a.topPos - 50,
            e = a.leftPos,
            f = 60,
            g = 50,
            h = [
                [.19, .25],
                [.43, .15],
                [.74, .05]
            ];
        Utils.addTip2({
            left: e + c * h[0][0] - f,
            top: d + c * h[0][1] - g,
            pos: "right",
            container: b,
            content: '偶尔使用<div style="font-size:16px">11%</div>',
            delay: 1e3
        }), Utils.addTip2({
            bgColor: "#fbf6f3",
            left: e + c * h[1][0] - f,
            top: d + c * h[1][1] - g,
            pos: "right",
            container: b,
            content: '从未使用<div style="font-size:16px">4%</div>',
            delay: 1100
        }), Utils.addTip2({
            bgColor: "#abd83e",
            left: e + c * h[2][0],
            top: d + c * h[2][1],
            pos: "left",
            container: b,
            content: '经常使用<div style="font-size:16px">85%</div>',
            delay: 1200
        })
    }

    function b(a, b) {
        setTimeout(function() {
            $(".p-donut-center").css(b)
        }, a)
    }
    Charts.add("p-donut", {
        init: function() {
            var c = .9,
                d = $("#p-donut"),
                e = d.width(),
                f = d.height(),
                g = Math.min(e, f),
                h = g * c,
                i = f - h,
                j = (e - h) / 2;
            $('<img src="shushuo.baidu.com.mobile2014Q2.images/p-donut.png" width="' + h + '" />').css({
                marginLeft: j + "px",
                marginTop: i + "px"
            }).appendTo(d).addClass("p-donut-do-anim"), a({
                container: d,
                topPos: i,
                leftPos: j,
                side: h
            }), b(800, {
                opacity: 1,
                webkitTransform: "translate3d(0px, " + (f - h / 2 - $(".p-donut-center").height() / 2) + "px, 0px)"
            })
        }
    })
}(),
function() {
    function a(a) {
        var b = a.container,
            c = '<li class="bubble-num">' + a.values.join('</li><li class="bubble-num">') + "</li>",
            d = "<li>" + a.companies.join("</li><li>") + "</li>",
            e = [
                ["left", "right"],
                ["right", "left"]
            ],
            f = e[a.posType],
            g = $('<div class="bubble-container"><ul class="value ' + f[0] + '">' + c + '</ul><ul class="company ' + f[1] + '">' + d + "</ul></div>").css({
                height: a.values.length * a.lineHeight + "px",
                width: b.width() / 2 - 1 + "px"
            }).appendTo(b);
        g.find("li").css({
            height: a.lineHeight + "px",
            lineHeight: a.lineHeight + "px"
        });
        var h = a.values.length;
        return a.values.forEach(function(b) {
            var c = b * a.radiusBase;
            $('<div class="bubble"></div>').css({
                position: "absolute",
                width: c + "px",
                height: c + "px",
                left: (g.width() - c) / 2 + "px",
                top: (h - .5) * a.lineHeight - c / 2 + "px",
                webkitTransform: "scale(0.1)"
            }).appendTo(g).addClass(a.className)
        }), $('<div class="mobi-icon ' + a.iconType + '"></div>').appendTo(g).css(a.iconStyle), setTimeout(function() {
            var b = g.find(".bubble");
            a.values.forEach(function(c, d) {
                $(b[d]).css({
                    webkitTransform: "translate3d(0px, " + (d - h + 1) * a.lineHeight + "px, 0px) scale(1)"
                })
            })
        }, 500), g
    }
    Charts.add("bubble", {
        init: function() {
            var b = $("#bubble"),
                c = 5,
                d = (b.height() - 20) / c;
            a({
                container: b,
                values: [3.4, 2.8, .8, .8, .7],
                companies: ["腾讯", "百度", "阿里", "搜狐", "新浪"],
                radiusBase: 18,
                lineHeight: d,
                className: "color0",
                posType: 0,
                iconType: "android",
                iconStyle: {
                    right: "15px"
                }
            }).css({
                borderRight: "#FFF 1px dashed"
            }), a({
                container: b,
                values: [3.7, 2.1, .9, .5, .4],
                companies: ["腾讯", "百度", "阿里", "美图", "新浪"],
                radiusBase: 18,
                lineHeight: d,
                className: "color1",
                posType: 1,
                iconType: "iphone",
                iconStyle: {
                    left: "15px"
                }
            })
        }
    })
}(),
function() {
    function a() {
        var a = [],
            b = [],
            c = Utils.arraySum(j.value),
            d = 0;
        j.value.forEach(function(e) {
            var f = e / c * 360;
            a.push(f), b.push(d), d += f
        }), j.angles = a, j.start = b
    }

    function b(a, b, c) {
        var d = a.find(".label").css({
            position: "absolute",
            top: c / 2 - 50 + "px",
            color: "#388742",
            fontSize: "20px"
        });
        d.css({
            left: (b - d.width()) / 2 + "px"
        })
    }

    function c(a, b, c, d) {
        {
            var e = 164,
                f = 145,
                g = 71;
            a.find(".search-icon").css({
                width: b + "px",
                height: b / e * f + "px",
                backgroundSize: "343px",
                left: c / 2 - b / e * g + "px",
                top: d / 2 - .15 * b + "px"
            })
        }
    }

    function d(a, d) {
        var e = a.container,
            f = a.radius,
            h = $('<div class="center"><div class="label">' + a.label + '</div><div class="search-icon"></div></div>').css({
                position: "absolute",
                width: 2 * f + "px",
                height: 2 * f + "px",
                left: e.width() / 2 - f + "px",
                top: e.height() / 2 - f + "px",
                webkitTransform: "scale(" + a.startScale + ")",
                zIndex: 100
            }).appendTo(e),
            i = h.width(),
            j = h.height();
        return b(h, i, j), c(h, 80, i, j), setTimeout(function() {
            h.css({
                webkitTransform: "scale(1)"
            })
        }, d), h.on("touchstart", function() {
            h.animClass("beat2"), g(m), m++, o()
        }), h
    }

    function e(a) {
        var b = a.container,
            c = new kc.PieChart("round");
        c.setConfig(l), c.setOption("plotOptions.pie.center", {
            x: b.width() / 2,
            y: b.height() / 2
        }), c.update(l), h = c.getPlots().getElement("pies").getElementList()
    }

    function f(a) {
        var b = a.container,
            c = Math.sin,
            d = Math.cos;
        j.angles.forEach(function(e, f) {
            var e = e / 2 + j.start[f] - 90,
                g = 90 > e && e > -90 || 360 > e && e > 270,
                h = j.name[f],
                i = 16 * h.length,
                k = a.r + 20,
                l = b.width() / 2,
                m = b.height() / 2,
                n = Utils.angle2radian(e),
                o = d(n),
                p = c(n);
            $('<div class="link-txt link-txt' + f + ' link" index="' + f + '">' + h + "</div>").css({
                top: m + (k + (g ? 0 : i)) * p - 6,
                left: l + (k + (g ? 0 : i)) * o,
                textAlign: g ? "left" : "right",
                width: i,
                webkitTransformOrigin: "0% 50%",
                webkitTransform: "rotate(" + (g ? e : e - 180) + "deg)"
            }).appendTo(b).attr({
                tl: l + (k - 10) * o,
                tt: m + (k - 10) * p
            })
        }), $("body").delegate(".link-txt, .link-dot", "touchstart", function() {
            var a = Number($(this).attr("index"));
            g(a), m = a + 1, o()
        }), setTimeout(function() {
            g(0)
        }, 500)
    }

    function g(a) {
        j.start[a], j.name.length;
        i && i.update({
            color: k[p]
        }), h[a].update({
            color: "#f3e50c"
        }), p = a, i = h[a], $(".link-txt").show();
        var b = $(".link-txt" + a).hide();
        q.css({
            top: parseInt(b.attr("tt") - 50) + "px",
            display: "block"
        }).find(".content").html(j.name[a] + '<br /><span style="font-size:16px">' + j.value[a] + "%</span>"), q.css({
            left: b.attr("tl") - q.width() / 2 + "px"
        }).removeClass("tip-anim"), setTimeout(function() {
            q.addClass("tip-anim")
        }, 0)
    }
    var h, i, j = {
            name: ["书籍文档", "生活服务", "在线工具服务", "健康保健", "教育", "成人", "人物", "影视动画", "新闻资讯", "商品购物", "音乐", "游戏", "其他"],
            value: [15.1, 14, 9.8, 9.7, 9.1, 8, 6.5, 4.9, 4.8, 3.3, 3, 2.9, 12.1]
        },
        k = ["#433769", "#333369", "#1f3164", "#0f376d", "#13426d", "#0f4d6c", "#125768", "#166164", "#1a6b5f", "#1e755a", "#238953", "#279350", "#29a54a"],
        l = {
            color: k,
            defaultColor: "#11722e",
            plotOptions: {
                pie: {
                    shadow: {
                        enabled: !1,
                        size: 4,
                        x: 0,
                        y: 0,
                        color: "rgba( 0, 0, 0, 0.3 )"
                    },
                    innerRadius: 90,
                    outerRadius: 110,
                    incrementRadius: 20,
                    stroke: {
                        width: 0
                    }
                },
                label: {
                    enabled: !1
                }
            },
            legend: {
                enabled: !1,
                level: "data"
            },
            animation: {
                enabled: !1,
                duration: 600,
                mode: "ease"
            },
            series: [{
                name: "搜索占比",
                data: [{
                    name: "书籍文档",
                    value: 15.1
                }, {
                    name: "生活服务",
                    value: 14
                }, {
                    name: "在线工具服务",
                    value: 9.8
                }, {
                    name: "健康保健",
                    value: 9.7
                }, {
                    name: "教育",
                    value: 9.1
                }, {
                    name: "成人",
                    value: 8
                }, {
                    name: "人物",
                    value: 6.5
                }, {
                    name: "影视动画",
                    value: 4.9
                }, {
                    name: "新闻资讯",
                    value: 4.8
                }, {
                    name: "商品购物",
                    value: 3.3
                }, {
                    name: "音乐",
                    value: 3
                }, {
                    name: "游戏",
                    value: 2.9
                }, {
                    name: "其他",
                    value: 12.1
                }]
            }]
        },
        m = 1,
        n = j.name.length,
        o = function() {
            m > n - 1 && (m = 0)
        },
        p = 0,
        q = Utils.addTip({
            container: $("#round"),
            bgColor: "#116165",
            content: "",
            style: {
                backgroundColor: "#116165",
                display: "none",
                zIndex: 600,
                textAlign: "center",
                minWidth: "40px"
            }
        });
    Charts.add("round", {
        init: function() {
            var b = $("#round"),
                c = {
                    w: 4,
                    h: 20,
                    rectCount: 48,
                    container: b,
                    rectInterval: 15,
                    centerStartR: .2,
                    centerRadius: 80,
                    centerTimer: 800
                };
            c.r = c.centerRadius + 10;
            var g = c.rectCount;
            a(g); {
                var h = c.centerTimer;
                d({
                    radius: c.centerRadius,
                    startScale: c.centerStartR,
                    container: b,
                    label: "14Q2"
                }, h)
            }
            setTimeout(function() {
                e(c), setTimeout(function() {
                    f(c)
                }, 200)
            }, h + 500)
        }
    })
}(),
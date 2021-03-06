define(['zepto', 'd3'], function($, d3) {
	var opt = {
		color: ["#87e0b7"],
		xAxis: {
			categories: ["12Q2", "12Q3", "12Q4", "13Q1", "13Q2", "13Q3", "13Q4", "14Q1", "14Q2"],
			ticks: {
				enabled: false
			},
			margin: {
				right: 10,
				left: 5
			},
			axis: {
				enabled: false
			},
			padding: {
				left: 10,
				right: 10
			},
			label: {
				enabled: true,
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
				enabled: false
			},
			label: {
				enabled: false,
				rotate: 0,
				font: {
					color: "#FFF",
					fontSize: 10
				}
			},
			axis: {
				enabled: false
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
					enabled: false
				}
			},
			line: {
				width: 6,
				dot: {
					enabled: false
				}
			},
			label: {
				enabled: false
			}
		},
		legend: {
			enabled: false
		},
		interaction: {
			onHover: null
		},
		series: [{
			name: "中国智能手机",
			data: [1.2, 1.63, 2.33, 2.79, 2.88, 3.27, 3.85, 4.43, 4.63]
		}],
		animation: {
			enabled: false
		}
	}

	function init() {
		var width = 600,
			height = 600;
		var dataSet = [1.2, 1.63, 2.33, 2.79, 2.88, 3.27, 3.85, 4.43, 4.63],
			xSet = ["12Q2", "12Q3", "12Q4", "13Q1", "13Q2", "13Q3", "13Q4", "14Q1", "14Q2"],
			ySet = [0, 1, 2, 3, 4, 5];
		//在 body 里添加一个 SVG 画布	
		var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		// //画布周边的空白
		// var padding = {
		// 	left: 30,
		// 	right: 30,
		// 	top: 20,
		// 	bottom: 20
		// };

		//x轴的比例尺
		var xScale = d3.scale.ordinal()
			.domain(xSet)
			.rangeBands([0, width]);

		//y轴的比例尺
		var yScale = d3.scale.linear()
			.domain([0, d3.max(ySet)])
			.range([height, 0]);

		//定义x轴
		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

		//定义y轴
		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

		var line = d3.svg.line()
			.x(function(d,i) {
				return xScale(xSet[i]);
			})
			.y(function(d,i) {
				return yScale(d);
			});

		var area = d3.svg.area()
			.x(function(d,i) {
				return xScale(xSet[i]);
			})
			.y0(height)
			.y1(function(d,i) {
				return yScale(d);
			});
			
		var defs = svg.append("defs");
		var lineColor = defs.append("linearGradient")
		.attr("id", "lineColor")
		.attr("x1", "100%")
		.attr("y1", "100%")
		.attr("x2", "100%")
		.attr("y2", "0");
		lineColor.append("stop")
		.attr("offset", "0")
		.attr("stop-color", "#a7df1e")
		.attr("stop-opacity", 1);
		lineColor.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#7be1f0")
		.attr("stop-opacity", 0);
		var areaColor = defs.append("linearGradient")
		.attr("id", "areaColor")
		.attr("x1", "100%")
		.attr("y1", "100%")
		.attr("x2", "100%")
		.attr("y2", "0");
		areaColor.append("stop")
		.attr("offset", "0")
		.attr("stop-color", "#dccfa7")
		.attr("stop-opacity", 0);
		areaColor.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#dccfa7")
		.attr("stop-opacity", 1);

		svg.append("path")
			.attr("d", line(dataSet))
			.attr("fill", "none")
		    .attr("stroke-width", 10)
	        .style("stroke", "url(#" + lineColor.attr("id") +")")

	    svg.append("path")
	        .attr("d", area(dataSet))
	        .style("fill", "url(#" + areaColor.attr("id") +")")
	}
	init();
	console.log(d3);
});
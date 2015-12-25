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

		//画布周边的空白
		var padding = {
			left: 30,
			right: 30,
			top: 20,
			bottom: 20
		};

		//x轴的比例尺
		var xScale = d3.scale.ordinal()
			.domain(xSet)
			.rangeRoundBands([0, width - padding.left - padding.right]);

		//y轴的比例尺
		var yScale = d3.scale.linear()
			.domain([0, d3.max(ySet)])
			.range([height - padding.top - padding.bottom, 0]);

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

		svg.append("path")
			.attr("d", line(dataSet))
		    .attr("stroke","steelblue")
		    .attr("stroke-width", 2)
		    .attr("fill", "none")

		//矩形之间的空白
		var rectPadding = 4;

		//添加矩形元素
		var rects = svg.selectAll(".MyRect")
			.data(dataSet)
			.enter()
			.append("rect")
			.attr("class", "MyRect")
			.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
			.attr("x", function(d, i) {
				console.log(d, i, xScale(d), xScale(i), xSet[i]);
				return xScale(xSet[i]) + rectPadding / 2;
			})
			.attr("y", function(d) {
				return yScale(d);
			})
			.attr("width", xScale.rangeBand() - rectPadding)
			.attr("height", function(d) {
				return height - padding.top - padding.bottom - yScale(d);
			});

		//添加x轴
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
			.call(xAxis);

		//添加y轴
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
			.call(yAxis);

	}
	init();
	console.log(d3);
});
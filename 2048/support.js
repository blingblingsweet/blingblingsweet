var content = document.getElementById('content')
, canvas = document.getElementById('canvas')
canvas.width = content.offsetWidth
canvas.height = content.offsetHeight


var config = {
	over: true,
	score: {
		x: canvas.width/4*3,
		y: (canvas.height-canvas.width)/2,
		fontSize: (canvas.height-canvas.width) * 0.4,
		value: 0,
		add: 0
	},
	board: {
		x: 0,
		y: canvas.height - canvas.width,
		width: canvas.width,
		height: canvas.width,
		color: "#BCAD9D",
		radius: 6
	},
	border: {
		width: canvas.width/25
	},
	grid: {
		width: canvas.width/5,
		height: canvas.width/5,
		color: "#CDBFB5",
		radius: 6
	},
	card: {
		backColors: ["#EEE4DA", "#EFE0CB", "#F3B079", "#F59565", "#F75E3E", "#FF6600", "#EDCE71", "#EDCD60", "#FFCC33", "#FF6633", "#FFFF00"],
		txtColors: ["#776e65", "#776e65", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
	},
	map: [], //地图
	queue: [] //动画队列
}

var Canvas = (function() {

	function Klass() {}

	Klass.cxt = canvas.getContext("2d")

	Klass.clear = function() {
		this.cxt.clearRect(0, 0, canvas.width, canvas.height)
	}
	return Klass
})()

var BasicLib = (function() {
	// 基础图形静态类
	var Klass = function() {}
	Klass.cxt = Canvas.cxt

	Klass.fillText = function(text, x, y, size, color) {
		this.cxt.font = "bold " + size + "px Arial"
		this.cxt.textAlign = "center"
		this.cxt.textBaseline = "middle"
		this.cxt.fillStyle = color
		this.cxt.fillText(text, x, y)
	}
	Klass.pathRoundRect = function(width, height, radius) {
		this.cxt.beginPath()

		this.cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
		this.cxt.lineTo(radius, height)

		this.cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
		this.cxt.lineTo(0, radius)

		this.cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
		this.cxt.lineTo(width - radius, 0)

		this.cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

		this.cxt.closePath()
	}
	Klass.fillRoundRect = function(x, y, width, height, radius, fillColor) {
		if (2 * radius > width || 2 * radius > height)
			return
		this.cxt.save()
		this.cxt.translate(x, y)
		this.pathRoundRect(width, height, radius)
		this.cxt.fillStyle = fillColor || 'black'
		this.cxt.fill()
		this.cxt.restore()
	}
	return Klass
})()

var ScoreView = (function() {
	var Klass = function() {}

	Klass.x = config.score.x
	Klass.y = config.score.y
	Klass.fontSize = config.score.fontSize
	Klass.addX = 20
	Klass.arrived = false

	Klass.draw = function() {
		BasicLib.fillText("Score: " + config.score.value, this.x, this.y, this.fontSize, "#776e65")
	}

	Klass.add = function(score) {
		var step = 5
		this.addX += step
		console.log(this.addX, this.x);
		if (this.addX < this.x) 
			BasicLib.fillText(" + " + config.score.add, this.addX, this.y, this.fontSize, "#776e65")
		else {
			this.addX = 20
			this.arrived = true
		}
	}

	return Klass;
})()

var BoardView = (function() {
	// 棋盘静态类
	var Klass = function() {}
	Klass.x = config.board.x
	Klass.y = config.board.y
	Klass.width = config.board.width
	Klass.height = config.board.height
	Klass.radius = config.board.radius
	Klass.borderWidth = config.border.width
	Klass.color = config.board.color
	Klass.gridWidth = config.grid.width
	Klass.gridHeight = config.grid.height
	Klass.gridRadius = config.grid.radius
	Klass.gridColor = config.grid.color

	Klass.draw = function() {
		BasicLib.fillRoundRect(
			this.x, this.y, this.width, this.height,
			this.radius,
			this.color
		)
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				BasicLib.fillRoundRect(
					(this.x + this.borderWidth) + j * (this.gridWidth + this.borderWidth), (this.y + this.borderWidth) + i * (this.gridHeight + this.borderWidth),
					this.gridWidth,
					this.gridHeight,
					this.gridRadius,
					this.gridColor
				)
			}
		}
	}
	return Klass
})()

//NumberCard 类
var NumberCard = (function() {
	function Klass(options) {
		this.backColors = config.card.backColors
		this.txtColors = config.card.txtColors
		this.radius = config.grid.radius
		this.width = config.grid.width
		this.height = config.grid.height
		this.startPos = options.startPos //图片开始的位置
		this.endPos = {
				i: null,
				j: null
			} //{x:null,y:null}图片移动的目标位置
		this.step = 0
		this.arrived = false //false表示需要移动，true表示不需要再移动
		this.value = options.value
	}
	Klass.prototype.getX = function(j) {
		return config.board.x + config.border.width + j * (this.width + config.border.width)
	}
	Klass.prototype.getY = function(i) {
		return config.board.y + config.border.width + i * (this.height + config.border.width)
	}
	Klass.prototype.setEndPos = function(i, j) {
		this.endPos.i = i
		this.endPos.j = j
	}
	Klass.prototype.arrivedInit = function() {
		this.step = 0
		this.arrived = true
	}

	//按坐标绘制图片,参数：ctx为canvas上下文 width:图片宽度，height:图片高度
	Klass.prototype.drawByPos = function(x, y) {
		var me = this
		BasicLib.fillRoundRect(
			x,
			y,
			me.width,
			me.height,
			me.radius,
			me.backColors[me.value]
		)
		BasicLib.fillText(
			Math.pow(2, me.value),
			x + me.width / 2,
			y + me.height / 2,
			me.width * 0.5,
			me.txtColors[me.value]
		)

		// console.log(me.startPos, me.endPos, x, y);
	}

	//改变图片位置
	Klass.prototype.move = function(keyCode) {
		var me = this
		me.step += 20
		var sx = me.getX(me.startPos.j),
			ex = me.getX(me.endPos.j),
			sy = me.getY(me.startPos.i),
			ey = me.getY(me.endPos.i)

		switch (keyCode) {
			case 37: // 向左,x减小
				sx = sx - me.step
				if (sx <= ex) {
					sx = ex
					me.startPos.j = 0
					me.arrivedInit()
				}
				break
			case 38: // 向上,y减小
				sy = sy - me.step
				if (sy <= ey) {
					sy = ey
					me.startPos.i = 0
					me.arrivedInit()
				}
				break
			case 39: // 向右,x增加
				sx = sx + me.step
				if (sx >= ex) {
					sx = ex
					me.startPos.j = me.endPos.j
					me.arrivedInit()
				}
				break
			case 40: // 向下,y增加
				sy = sy + me.step
				if (sy >= ey) {
					sy = ey
					me.startPos.i = me.endPos.i
					me.arrivedInit()
				}
				break
		}
		me.drawByPos(sx, sy)
	}
	return Klass
})()
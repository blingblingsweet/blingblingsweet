(function() {
	initMap()

    document.getElementById("newGame").onclick = function(){
        initMap()
    }

	document.onkeydown = function(event) {
		var e = event || window.event
		var canMove = false
		switch (e.keyCode) {
			case 37:
				e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toLeft(true)
				break
			case 38:
				e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toTop(true)
				break
			case 39:
				e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toRight(true)
				break
			case 40:
				e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toBottom(true)
				break
			default:
				break
		}
		if (canMove)
			slide(e.keyCode)
	}

	function slide(keyCode) {
		Canvas.clear()
		ScoreView.draw()
		BoardView.draw()

		moveCard(keyCode)
		// ScoreView.add()

		if (isAllArrived()) {
			reDrawMap()
			getNewCard()
		} else {

			window.requestAnimationFrame(function() {
				// console.log('animation')
				slide(keyCode)
			})
		}
	}

	// var startPos = {
	// 		x: null,
	// 		y: null
	// 	},
	// 	endPos = {
	// 		x: null,
	// 		y: null
	// 	}

	// //计算滑动方向
	// function computeDirection() {
	// 	if (!checkQueue()) //一次滑动完成之前不能继续滑动
	// 		return

	// 	var flagMove = false
	// 	var x0 = endPos.x - startPos.x,
	// 		y0 = endPos.y - startPos.y
	// 	if (x0 > 0 && Math.abs(x0) > Math.abs(y0) || x0 > 0 && Math.abs(x0) > Math.abs(y0)) {
	// 		flagMove = searchMapRight(1) //alert("right")
	// 		der = 39
	// 	} else if (y0 < 0 && Math.abs(x0) < Math.abs(y0) || y0 < 0 && Math.abs(x0) < Math.abs(y0)) {
	// 		flagMove = searchMapUp(1) //alert("top")
	// 		der = 38
	// 	} else if (x0 < 0 && Math.abs(x0) > Math.abs(y0) || x0 < 0 && Math.abs(x0) > Math.abs(y0)) {
	// 		flagMove = searchMapLeft(1) //alert("left")
	// 		der = 37
	// 	} else if (y0 > 0 && Math.abs(x0) < Math.abs(y0) || y0 > 0 && Math.abs(x0) < Math.abs(y0)) {
	// 		flagMove = searchMapDown(1) //alert("down")
	// 		der = 40
	// 	}
	// 	if (flagMove)
	// 		slide(der)
	// }
})()
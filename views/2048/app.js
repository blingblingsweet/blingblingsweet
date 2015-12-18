(function() {
	initMap()

    document.getElementById("newGame").onclick = function(){
        initMap()
    }

	document.onkeydown = function(event) {
		var event = event || window.event
		direction(event.keyCode, event)
	}

	function direction(keyCode, e) {
		var canMove = false
		switch (keyCode) {
			case 37:
				if(e) 
					e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toLeft(true)
				break
			case 38:
				if(e) 
					e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toTop(true)
				break
			case 39:
				if(e) 
					e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toRight(true)
				break
			case 40:
				if(e) 
					e.preventDefault()
				if (!isAllArrived())
					return
				canMove = toBottom(true)
				break
			default:
				break
		}
		if (canMove)
			slide(keyCode)
		else
			gameOver()
	}

	function slide(keyCode) {
		Canvas.clear()
		ScoreView.draw()
		BoardView.draw()

		moveCard(keyCode)
		// ScoreView.move()

		if (isAllArrived() && !gameWin()) {
			reDrawMap()
			getNewCard()
		} else {
			window.requestAnimationFrame(function() {
				slide(keyCode)
			})
		}
	}

	var startx = 0
	var starty = 0
	var endx = 0
	var endy = 0

	document.addEventListener('touchstart',function(event){
	    startx = event.touches[0].pageX
	    starty = event.touches[0].pageY
	},false)

	document.addEventListener('touchend',function(event){
		var event = event || window.event
	    endx = event.changedTouches[0].pageX
	    endy = event.changedTouches[0].pageY

	    var deltax = endx - startx
	    var deltay = endy - starty

	    if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
	        return

	    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

	        if( deltax > 0 ){
	            direction(39)
	        }
	        else{
	            direction(37)
	        }
	    }
	    else{
	        if( deltay > 0 ){
	            direction(40)
	        }
	        else{
	            direction(38)
	        }
	    }
	},false)



    function gameOver(){
        if( toLeft(0) || toTop(0) || toRight(0) || toBottom(0)){            
            return false;
        }else{
            alert("游戏结束啦！");
            document.onkeydown = null;
            return true;
        }    
    }

    function gameWin(){
        if(config.win){
            alert("恭喜你，通过成功！！！");
            document.onkeydown = null;
            return true;
        }                
        return false;
    }

})()
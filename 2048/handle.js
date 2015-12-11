// {
//     card: 
//     value:
//     flag -> conflicted //标记是否合并过
// }

//产生一个新方块儿，参数为方块儿的值
function getNewCard() {
    var randi = (Math.random() * 40 | 0) % 4,
        randj = (Math.random() * 40 | 0) % 4
    var randNumber = Math.random() < 0.5 ? 1 : 2;
    // console.log(randi, randj);
    if (!config.map[randi][randj].card) {
        var card = new NumberCard({
            startPos: {
                i: randi,
                j: randj
            },
            value: randNumber
        })

        card.drawByPos(card.getX(randj), card.getY(randi))
        config.map[randi][randj].card = card
        config.map[randi][randj].value = randNumber
    } else {
        getNewCard()
    }
}

//创建4 * 4地图
function initMap() {
    config.map = []
    config.score.value = 0;
    for (var i = 0; i < 4; i++) {
        config.map[i] = []
        for (var j = 0; j < 4; j++) {
            config.map[i][j] = {}
            config.map[i][j].value = 0
            config.map[i][j].conflicted = false
        }
    }
    ScoreView.draw()
    BoardView.draw()
    getNewCard()
    getNewCard()
}

// 移动已有方块
function moveCard(keyCode) {
    config.queue.length = 0
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (config.map[i][j].card) {
                config.map[i][j].card.move(keyCode)
                config.queue.push(config.map[i][j].card)
            }
}

/*
    检查队列里的方块儿是否都移动完成
    false: 队列里还有未完成的方块儿
*/
function isAllArrived() {
    for (var i = 0, len = config.queue.length; i < len; i++)
        if (!config.queue[i].arrived) {
            return false
        }

    return true
}

//移动完成后，重绘地图
function reDrawMap() {
    Canvas.clear()
    BoardView.draw()
    ScoreView.draw()
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (config.map[i][j].value > 0) {
                var card = new NumberCard({
                    startPos: {
                        i: i,
                        j: j
                    },
                    value: config.map[i][j].value
                })
                card.drawByPos(card.getX(j),card.getY(i))
                config.map[i][j].card = card
            } else {
                if (config.map[i][j].card) {
                    delete config.map[i][j].card
                }
            }
            config.map[i][j].conflicted = false
        }
}

/*
    向左运动时，遍历 i行j列 地图，寻找方块儿的终点目标(NumberCard.endPos)
    confirm：参数，用于标记是否真的进行移动

    1、判断方块是否有值  是 -> 准备移动，储存当前方块值
    2、判断方块是否在最左边一列  是 -> 设置终点即为当前坐标，位置不动
    3、左边第二列起向后遍历，查看前面一格是否可以移动
        - 前面方块和当前方块数字相等，并且没有合并过 -> 数字乘方，终点设为前面方块位置
        - 前面方块和当前方块数字不等
            -> 设置终点为前面方块后面一格坐标，当前方块值设为零，终点值设为当前方块值
            -> 当前方块坐标和前面方块后面一格坐标相等，不能移动
        - 前面格子没有方块，即终点为最左边方块，当前方块值设为零
    
*/
function toLeft(confirm) {
    var canMove = false
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            if (config.map[i][j].value > 0) {
                // console.log('i', i, 'j', j);
                var tempValue = config.map[i][j].value
                if (j == 0) {
                    config.map[i][j].card.setEndPos(i, j)
                }
                for (var k = j - 1; k >= 0; k--) {
                    if (config.map[i][k].value > 0) {
                        if (config.map[i][k].value == tempValue && !config.map[i][k].conflicted) {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(i, k)
                                config.map[i][k].value++
                                config.map[i][k].conflicted = true


                                config.score.value += Math.pow(2,config.map[i][k].value)
                                config.score.add = Math.pow(2,config.map[i][k].value)

                                if (config.map[i][k].value == 11) //出现2048游戏通关
                                    config.win = true
                            }
                            canMove = true
                        } else {
                            if (confirm == 1) {
                                config.map[i][j].card.setEndPos(i, k + 1)
                                config.map[i][j].value = 0
                                config.map[i][k + 1].value = tempValue
                            }
                            // console.log('k', k);
                            if (j != k + 1)
                                canMove = true
                        }
                        break
                    }
                    if (k == 0) {
                        if (confirm == 1) {
                            config.map[i][j].card.setEndPos(i, k)
                            config.map[i][j].value = 0
                            config.map[i][k].value = tempValue
                        }
                        canMove = true
                    }
                }
            }
        }
    }
    return canMove
}

//向下运动时
function toRight(confirm) {
    var canMove = false
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j >= 0; j--) {
            if (config.map[i][j].value > 0) {
                var tempValue = config.map[i][j].value
                if (j == 3) {
                    config.map[i][j].card.setEndPos(i, j)
                }
                for (var k = j + 1; k < 4; k++) {
                    if (config.map[i][k].value > 0) {
                        if (config.map[i][k].value == tempValue && !config.map[i][k].conflicted) {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(i, k)
                                config.map[i][k].value++
                                config.map[i][k].conflicted = true
                                config.score.value += Math.pow(2,config.map[i][k].value)
                                config.score.add = Math.pow(2,config.map[i][k].value)
                                if (config.map[i][k].value == 11)
                                    config.win = true
                            }
                            canMove = true
                        } else {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(i, k - 1)
                                config.map[i][k - 1].value = tempValue
                            }
                            if (j != k - 1)
                                canMove = true
                        }
                        break
                    }
                    if (k == 3) {
                        if (confirm == 1) {
                            config.map[i][j].value = 0
                            config.map[i][j].card.setEndPos(i, k)
                            config.map[i][k].value = tempValue
                        }
                        canMove = true
                    }
                }
            }
        }
    }
    return canMove
}

function toTop(confirm) {
    var canMove = false
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            if (config.map[i][j].value > 0) {
                var tempValue = config.map[i][j].value
                if (i == 0) {
                    config.map[i][j].card.setEndPos(i, j)
                }
                for (var k = i - 1; k >= 0; k--) {
                    if (config.map[k][j].value > 0) {
                        if (config.map[k][j].value == tempValue && !config.map[k][j].conflicted) {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(k, j)
                                config.map[k][j].value++
                                config.map[k][j].conflicted = true
                                config.score.value += Math.pow(2,config.map[k][j].value)
                                config.score.add = Math.pow(2,config.map[i][k].value)
                                if (config.map[k][j].value == 11)
                                    config.win = true
                            }
                            canMove = true
                        } else {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(k + 1, j)
                                config.map[k + 1][j].value = tempValue
                            }
                            if (i != k + 1)
                                canMove = true
                        }
                        break
                    }
                    if (k == 0) {
                        if (confirm == 1) {
                            config.map[i][j].value = 0
                            config.map[i][j].card.setEndPos(k, j)
                            config.map[k][j].value = tempValue
                        }
                        canMove = true
                    }
                }
            }
        }
    }
    return canMove
}

function toBottom(confirm) {
    var canMove = false
    for (var j = 0; j < 4; j++) {
        for (var i = 3; i >= 0; i--) {
            if (config.map[i][j].value > 0) {
                var tempValue = config.map[i][j].value
                if (i == 3) {
                    config.map[i][j].card.setEndPos(i, j)
                }
                for (var k = i + 1; k < 4; k++) {
                    if (config.map[k][j].value > 0) {
                        if (config.map[k][j].value == tempValue && !config.map[k][j].conflicted) {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(k, j)
                                config.map[k][j].value++
                                config.map[k][j].conflicted = true
                                config.score.value += Math.pow(2,config.map[k][j].value);
                                if (config.map[k][j].value == 11)
                                    config.win = true
                            }
                            canMove = true
                        } else {
                            if (confirm == 1) {
                                config.map[i][j].value = 0
                                config.map[i][j].card.setEndPos(k - 1, j)
                                config.map[k - 1][j].value = tempValue
                            }
                            if (i != k - 1)
                                canMove = true
                        }
                        break
                    }
                    if (k == 3) {
                        if (confirm == 1) {
                            config.map[i][j].value = 0
                            config.map[i][j].card.setEndPos(k, j)
                            config.map[k][j].value = tempValue
                        }
                        canMove = true
                    }
                }
            }
        }
    }
    return canMove
}
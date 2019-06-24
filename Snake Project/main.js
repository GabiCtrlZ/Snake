const head = $('#head')
let counter = 0
function right() {
    let positionL = parseInt(head.css('left')) + 30
    if (positionL <= 600) {
        head.css('left', positionL + 'px')
    }
}
function left() {
    let positionL = parseInt(head.css('left')) - 30
    if (positionL >= -30) {
        head.css('left', positionL + 'px')
    }
}
function up() {
    let positionL = parseInt(head.css('top')) - 30
    if (positionL >= -30) {
        head.css('top', positionL + 'px')
    }
}
function down() {
    let positionL = parseInt(head.css('top')) + 30
    if (positionL <= 600) {
        head.css('top', positionL + 'px')
    }
}

function move(key) {
    lastDir = key.keyCode
}
let lastDir = 39
setInterval(function () {
    let x = headPositionX()
    let y = headPositionY()
    let arr = bodyPos()
    switch (lastDir) {
        case 37:
            left()
            break
        case 38:
            up()
            break
        case 39:
            right()
            break
        case 40:
            down()
    }
        if (checkDead($('.body'))) {
            $('#container').empty()
            $('#container').append('<div style="font-size: 50px; text-align: center;">You Died</div>')
            $('#container').append('<div style="font-size: 50px; text-align: center;">Refresh to play again</div>')
        }
    if (checkEat()) {
        $('#food').remove()
        generateRanBox()
        appendCounter()
        appendBody(x, y)
    }
    bodyMov(x, y)
    allBodyMove(arr)
}, 100)

function randomNum() {
    let num = Math.floor(Math.random() * 19);
    return num * 30
}

function generateRanBox() {
    $('#container').append(`<div id="food" style="left: ${randomNum()}px; top: ${randomNum()}px;"></div>`)
}

function checkEat() {
    return (parseInt(head.css('top')) == parseInt($('#food').css('top')) && parseInt(head.css('left')) == parseInt($('#food').css('left')))
}

function checkDead(arr) {
    if (parseInt(head.css('top')) == -30 || parseInt(head.css('top')) == 600) {
        return true
    }
    if (parseInt(head.css('left')) == -30 || parseInt(head.css('left')) == 600) {
        return true
    }
    for (let bPart of arr){
        if(parseInt(head.css('left')) == parseInt($(bPart).css('left')) && parseInt(head.css('top')) == parseInt($(bPart).css('top'))) {
          return true  
        }

    }
    return false
}
function appendCounter() {
    counter += 10
    $('#counter').text(counter)
}
function appendBody(x, y) {
    $('#container').append(`<div class="body" style="left: ${x}px; top: ${y}px;"></div>`)
}
function headPositionY() {
    return parseInt(head.css('top'))
}
function headPositionX() {
    return parseInt(head.css('left'))
}
function bodyMov(x, y) {
    $('.body').first().css('top', y + "px")
    $('.body').first().css('left', x + "px")
}
function bodyPos() {
    let arr = $('.body')
    let positionArr = []
    for (bPart of arr) {
        positionArr.push({
            x: parseInt($(bPart).css('left')),
            y: parseInt($(bPart).css('top'))
        })
    }
    return positionArr
}

function allBodyMove(array) {
    let arr = $('.body')
    for (let i = 1; i < arr.length; i++){
        $(arr[i]).css('top', array[i-1].y + "px")
        $(arr[i]).css('left', array[i-1].x + "px")
    }
}

$('body').on('keydown', move)
generateRanBox()


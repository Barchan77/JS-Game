const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'olive', 'gold', 'purple', 'indigo', 'navy']
let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'
    const interval = setInterval(function() {
        let time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    const time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ('')
    const box = document.createElement('div')
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize
    let randomColorIndex = getRandom(0, colors.length)
    
    box.style.height = box.style.width = boxSize + 'px'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.position = 'absolute'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


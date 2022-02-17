import inputStrip from '../inputStrip.js' 
import startTimer from './clock.js'

const yourWord = document.getElementById("yourWord")
var yourWordle;
const wordle = document.getElementById("wordleBoxes")
var typingWordle;
var word = ""
// a new wordle should be added each time so perhaps your wordle should change each time
async function runGame(oppStrip, socket, theWord) {
    return new Promise((resolve) => {
        socket.emit("playerStarted")
        word = theWord
        yourWordle = oppStrip
        typingWordle = new inputStrip("wordleBoxes", 10)
        typingWordle.fadeInAnim()
        typingWordle.getInputBox(0).focus()
        startTimer()

        socket.on("getWordGuess", () => {
            socket.emit('wordGuess', typingWordle.getStripInfo())
        })

        socket.on("hitMap", (yourHitMap) => {
            updateYourHitmap(yourHitMap)
            typingWordle.disableInput()
            typingWordle = new inputStrip("wordleBoxes", 10)
            typingWordle.fadeInAnim()
            typingWordle.getInputBox(0).focus() 
            startTimer()
        })
        socket.on("oppHitMap", (oppHitMap) => {
            updateTheirHitmap(oppHitMap)
        })

        socket.on("win", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            win()
            resolve()
        })
        socket.on("lose", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            loss()
            resolve()
        })
        socket.on("draw", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            draw()
            resolve()
        })
    })
}

var yourScore = document.getElementById("youScore")
var oppScore = document.getElementById("oppScore")

function updateScore(score, theirScore) {
    yourScore.innerHTML = "YOU: " + score
    oppScore.innerHTML = "OPP: " + theirScore
}

var gameResult = document.getElementById("gameResult")
var resultText = document.getElementById("resultText")

function win(){
    resultText.innerHTML = "You Won!"
    gameResult.style.display = "block"
    gameResult.style.animation = "showBanner ease-in-out 1s forwards"
    gameResult.addEventListener("animationend", function resultFunc(){
        setTimeout(() => {gameResult.style.display = "none"}, 2000)
        this.removeEventListener("animationend", resultFunc)
    })
}
function draw(){
    resultText.innerHTML = "Draw!"
    gameResult.style.display = "block"
    gameResult.style.animation = "showBanner ease-in-out 1s forwards"
    gameResult.addEventListener("animationend", function resultFunc(){
        setTimeout(() => {gameResult.style.display = "none"}, 2000)
        this.removeEventListener("animationend", resultFunc)
    })
}
function loss(){
    resultText.innerHTML = "You Lose :("
    gameResult.style.display = "block"
    gameResult.style.animation = "showBanner ease-in-out 1s forwards"
    gameResult.addEventListener("animationend", function resultFunc(){
        setTimeout(() => {gameResult.style.display = "none"}, 2000)
        this.removeEventListener("animationend", resultFunc)
    })
}

function updateYourHitmap(hitMap){
    console.log(hitMap)
    for(var i=0; i<5; i ++){
        var hitMapLetter = hitMap.substring(i,i+1)
        var box = typingWordle.getInputBox(i)
        if (/^[A-Z]$/i.test(hitMapLetter)){
            if (hitMapLetter == hitMapLetter.toUpperCase()) {
                box.style.backgroundColor = "green"
            }else {
                box.style.backgroundColor = "orange"
            }
        }else{
            box.style.backgroundColor = "white"
        }

    }
}

function updateTheirHitmap(partnerHitMap){
    for(var i=0; i<5; i ++){
        var hitMapLetter = partnerHitMap.substring(i,i+1)
        var box = yourWordle.getInputBox(i)
        if (/^[A-Z]$/i.test(hitMapLetter)){
            if (hitMapLetter == hitMapLetter.toUpperCase()) {
                box.style.backgroundColor = "green"
            }else{
                box.style.backgroundColor = "orange"
            }
        }else{
            box.style.backgroundColor = "white"
        }
    }
}


export default runGame
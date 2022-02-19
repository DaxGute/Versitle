import inputStrip from '../inputStrip.js' 
import startTimer from './clock.js'

const yourWord = document.getElementById("yourWord")
var yourWordle;
const wordle = document.getElementById("wordleBoxes")
var typingWordle;
var word = ""
// a new wordle should be added each time so perhaps your wordle should change each time
async function runGame(oppStrip, socket, theWord, isFirstTime) {
    return new Promise((resolve) => {
        socket.emit("playerStarted")
        word = theWord
        yourWordle = oppStrip

        document.getElementById("title").style.display = "block"
        document.getElementById("title").style.animation = "fadeIn ease-in-out 0.1s forwards"
        document.getElementById("scores").style.display = "block"
        document.getElementById("scores").style.animation = "fadeIn ease-in-out 0.1s forwards"

        typingWordle = new inputStrip("wordleBoxes", 10)
        typingWordle.fadeInAnim()
        typingWordle.getInputBox(0).focus()
        startTimer()

        if (isFirstTime) { // can't be bothered with listeners right about now
            socket.on("getWordGuess", function wordGuessFunc() {
                socket.emit('wordGuess', typingWordle.getStripInfo())
            })

            socket.on("hitMap", function youHitFunc(yourHitMap) {
                updateYourHitmap(yourHitMap)
            })
            socket.on("oppHitMap", function oppHitFunc(oppHitMap) {
                updateTheirHitmap(oppHitMap)
            })
            socket.on("nextRound", function roundFunc() {
                typingWordle.disableInput()
                typingWordle = new inputStrip("wordleBoxes", 10)
                typingWordle.fadeInAnim()
                typingWordle.getInputBox(0).focus() 
                startTimer()
            })
        }

        socket.once("win", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            win()
            handleGamResult()
            resolve()
        })
        socket.once("lose", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            loss()
            handleGamResult()
            resolve()
        })
        socket.once("draw", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            draw()
            handleGamResult()
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
var gameResultBack = document.getElementById("gameResultBack")
var resultText = document.getElementById("resultText")

function win(){
    resultText.innerHTML = "You Won!"
    gameResult.style.backgroundColor = "#ccffcc"
}
function draw(){
    resultText.innerHTML = "Draw!"
    gameResult.style.backgroundColor = "#ffffe6"
}
function loss(){
    resultText.innerHTML = "You Lose :("
    gameResult.style.backgroundColor = "#ffb3b3"
}

function handleGamResult(){
    document.getElementById('gamePrompt').style.display = "none"
    gameResultBack.style.display = "block"
    gameResultBack.style.animation = "fadeIn ease-in-out 0.1s forwards"
    gameResult.style.display = "block"
    gameResult.style.animation = "showBanner ease-in-out 1s forwards"
    document.addEventListener("keypress", function resultFunc(e){
        if (e.code == "Enter"){
            gameResult.style.display = "none"
            gameResultBack.style.display = "none"

            this.removeEventListener("keypress", resultFunc)
        }
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
            box.style.backgroundColor = "#2f4d4d"
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
                //needs fixing
                for (var j=0; j<5; j ++){
                    if (hitMapLetter == word.substring(j,j+1)){
                        var orangeBox = yourWordle.getInputBox(j)
                        orangeBox.style.backgroundColor = "orange"
                    }
                }
                
            }
        }else{
            box.style.backgroundColor = "#2f4d4d"
        }
    }
}


export default runGame
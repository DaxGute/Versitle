import inputStrip from '../inputStrip.js' 
import startTimer from './clock.js'
import resetMatch from './resetMatch.js'

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

        document.getElementById("title").style.display = "block"
        document.getElementById("title").style.animation = "fadeIn ease-in-out 0.1s forwards"
        document.getElementById("scores").style.display = "block"
        document.getElementById("scores").style.animation = "fadeIn ease-in-out 0.1s forwards"

        typingWordle = new inputStrip("wordleBoxes", 10)
        typingWordle.fadeInAnim()
        typingWordle.getInputBox(0).focus()
        startTimer()

        socket.on("getWordGuess", () => {
            socket.emit('wordGuess', typingWordle.getStripInfo())
        })

        socket.on("hitMap", (yourHitMap) => {
            updateYourHitmap(yourHitMap)
        })
        socket.on("oppHitMap", (oppHitMap) => {
            updateTheirHitmap(oppHitMap)
        })
        socket.on("nextRound", () => {
            typingWordle.disableInput()
            typingWordle = new inputStrip("wordleBoxes", 10)
            typingWordle.fadeInAnim()
            typingWordle.getInputBox(0).focus() 
            startTimer()
        })

        socket.on("win", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            win()
            resetMatch(socket)
            resolve()
        })
        socket.on("lose", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            loss()
            resetMatch(socket)
            resolve()
        })
        socket.on("draw", (yourScore, theirScore) => {
            updateScore(yourScore, theirScore)
            draw()
            resetMatch(socket)
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
    handleGamResult()
}
function draw(){
    resultText.innerHTML = "Draw!"
    gameResult.style.backgroundColor = "#ffffe6"
    handleGamResult()
}
function loss(){
    resultText.innerHTML = "You Lose :("
    gameResult.style.backgroundColor = "#ffb3b3"
    handleGamResult()
}

function handleGamResult(){
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
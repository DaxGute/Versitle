import inputStrip from '../inputStrip.js' 
import startTimer from './clock.js'

const yourWord = document.getElementById("yourWord")
var yourWordle;
const wordle = document.getElementById("wordleBoxes")
var typingWordle;
var word = ""

async function runGame(importantStrips, socket, theWord) {
    return new Promise((resolve) => {
        word = theWord
        yourWordle = importantStrips[0]
        typingWordle = importantStrips[1]
        console.log(typingWordle)
        typingWordle.getInputBox(0).focus()
        startTimer()
        socket.on("getWord", () => {
            socket.emit('wordGuess', typingWordle.getStripInfo())
        })

        socket.on("hitMap", (yourHitMap) => {
            updateYourHitmap(yourHitMap)
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

var yourScore = document.getElementById("yourScore")
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

var yourOrange = []
const orangeLetters = document.getElementById("orangeLetters")
function updateYourHitmap(hitMap){
    console.log(hitMap)
    for(var i=0; i<5; i ++){
        var hitMapLetter = hitMap.substring(i,i+1)
        var box = typingWordle.getInputBox(i)
        if (/^[A-Z]$/i.test(hitMapLetter)){
            if (hitMapLetter == hitMapLetter.toUpperCase()) {
                box.style.backgroundColor = "green"
            }else {
                var letterNotFound = true
                
                for (let j = 0; j < yourOrange.length; j++) {
                    if(yourOrange[j] == hitMapLetter){
                        letterNotFound = false
                    }
                }
                if (letterNotFound) {
                    yourOrange.push(hitMapLetter)
                }
                box.style.backgroundColor = "white"
            }
        }else{
            box.innerHTML = ""
            box.style.backgroundColor = "white"
        }

    }
    orangeLetters.innerHTML = "" + yourOrange
}

function updateTheirHitmap(partnerHitMap){
    for(var i=0; i<5; i ++){
        var hitMapLetter = partnerHitMap.substring(i,i+1)
        var box = yourWordle.getInputBox(i)
        if (/^[A-Z]$/i.test(hitMapLetter)){
            if (hitMapLetter == hitMapLetter.toUpperCase()) {
                box.style.backgroundColor = "green"
            }else{
                box.style.backgroundColor = "white"
            }
        }else{
            box.style.backgroundColor = "white"
        }
    }
}


export default runGame
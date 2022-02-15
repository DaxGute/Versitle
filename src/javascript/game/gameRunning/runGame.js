import inputStrip from '../inputStrip.js' 
import startTimer from './clock.js'

const yourWord = document.getElementById("yourWord")
var yourWordStrip;
const wordle = document.getElementById("wordleBoxes")
var wordleStrip;

function runGame(importantStrips, socket) {
    var yourWordle = importantStrips[0]
    var typingWordle = importantStrips[1]
    typingWordle.getInputBox(0).focus()
    socket.on("getWord", () => {
        socket.emit('guessWord', typingWordle.getStripInfo())
    })
    socket.on("win", (yourScore, theirScore) => {
        updateScore(yourScore, theirScore)
    })
    socket.on("lose", (yourScore, theirScore) => {
        updateScore(yourScore, theirScore)
    })
    socket.on("draw", (yourScore, theirScore) => {
        updateScore(yourScore, theirScore)
    })
    startTimer().then(
        
    )
}

var yourScore = document.getElementById("yourScore")
var oppScore = document.getElementById("oppScore")

function updateScore(score, theirScore) {
    yourScore.innerHTML = "YOU: " + score
    oppScore.innerHTML = "OPP: " + theirScore
}

function win(score, theirScore){
    
}
function draw(){

}
function loss(){

}
function newGame(){

}



export default runGame
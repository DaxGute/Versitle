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
    startTimer().then(
        socket.emit('guessWord', typingWordle.getStripInfo())
    )
}



export default runGame
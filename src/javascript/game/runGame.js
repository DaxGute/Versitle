import inputStrip from './inputStrip.js' 
import startTimer from './clock.js'

const yourWord = document.getElementById("yourWord")

function setupGame(word){
    var yourWordStrip = new inputStrip("yourWord", 0)
    yourWordStrip.setStripInfo(word)
    yourWordStrip.disableInput()
    yourWord.style.animation = "lowerWord ease-in-out 1s forwards 1s" //I j have ti on delay here because I am lazy
    yourWord.addEventListener("animationend", function wordFunc(){
        runGame()
        document.getElementById("wordTimer").style.animation = "fadeIn ease-in-out 0.1s forwards"
        this.removeEventListener('animationend', wordFunc);
    })
}
function runGame(){
    startTimer()
}



export default setupGame
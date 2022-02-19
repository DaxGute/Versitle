import inputStrip from "../inputStrip.js"

const yourWord = document.getElementById("yourWord")
var yourWordStrip;
const wordle = document.getElementById("wordleBoxes")
var wordleStrip;

function setupGame(word){
    yourWordStrip = new inputStrip("yourWord", 0)
    yourWordStrip.setStripInfo(word)
    yourWordStrip.disableInput()
    window.getComputedStyle(yourWord).animation; 
    document.getElementById("gamePrompt").lastChild.style.animation = "fadeIn ease-in-out 0.5s forwards 1s"
    document.getElementById("gamePrompt").lastChild.style.animation = "lowerWord ease-in-out 1s forwards 1s" //I j have ti on delay here because I am lazy
    document.getElementById("gamePrompt").lastChild.addEventListener("animationend", function wordFunc(){
        document.getElementById("wordTimer").style.animation = "fadeIn ease-in-out 0.1s forwards"
        this.removeEventListener('animationend', wordFunc);
    })

    return yourWordStrip
    // wordleStrip.style.animation = "fadeIn ease-in-out 0.1s forwards"
}

export default setupGame
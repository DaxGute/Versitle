import inputStrip from "../inputStrip.js"

const yourWord = document.getElementById("yourWord")
var yourWordStrip;
const wordle = document.getElementById("wordleBoxes")
var wordleStrip;

function setupGame(word){
    yourWordStrip = new inputStrip("yourWord", 0)
    yourWordStrip.setStripInfo(word)
    console.log(word)
    yourWordStrip.disableInput()
    yourWord.style.animation = "fadeIn ease-in-out 0.5s forwards 1s"
    yourWord.style.animation = "lowerWord ease-in-out 1s forwards 1s" //I j have ti on delay here because I am lazy
    yourWord.addEventListener("animationend", function wordFunc(){
        document.getElementById("wordTimer").style.animation = "fadeIn ease-in-out 0.1s forwards"
        this.removeEventListener('animationend', wordFunc);
    })

    return yourWordStrip
    // wordleStrip.style.animation = "fadeIn ease-in-out 0.1s forwards"
}

export default setupGame
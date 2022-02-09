import inputStrip from './inputStrip.js' 

const wordPrompt = document.getElementById("wordPrompt")

function setupWord(){
    wordPrompt.style.display = "block"
    wordPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    new inputStrip("newWordStrip", 0)
}

export default setupWord
import inputStrip from './inputStrip.js' 

const wordPrompt = document.getElementById("wordPrompt")
const confirmWord= document.getElementById("confirmWord")

async function setupWord(){
    wordPrompt.style.display = "block"
    wordPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    var wordStrip = new inputStrip("newWordStrip", 0)

    var word = await waitForWord(wordStrip)

    wordPrompt.style.animation = "fadeOut ease-in-out 1s forwards"
    wordPrompt.addEventListener("animationend", () => {
        wordPrompt.style.display = "none"   
    })

    return word
}

function waitForWord(newWordStrip){
    return new Promise((resolve) => {
        confirmWord.addEventListener("click", () => {
            var word = newWordStrip.getStripInfo();
            if (isWordValid(word)){
                resolve(word)
            }
        })
    })
}

function isWordValid(word){
    return true
}

export default setupWord
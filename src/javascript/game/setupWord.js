import inputStrip from './inputStrip.js' 

const wordPrompt = document.getElementById("wordPrompt")
const confirmWord= document.getElementById("confirmWord")

async function setupWord(){
    wordPrompt.style.display = "block"
    wordPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    var wordStrip = new inputStrip("newWordStrip", 0)

    var word = await waitForWord(wordStrip)

    wordPrompt.style.animation = "turnToGame ease-in-out 1s forwards"
    wordPrompt.addEventListener("animationend", function wordFunc(){
        const gamePrompt = document.getElementById("gamePrompt")
        gamePrompt.style.display = "block"
        gamePrompt.style.animation = "fadeIn ease-in-out 1s forwards"

        //chains them one after aother
        gamePrompt.addEventListener('animationend', function gameFunc(){ //this technically triggers mutliple times because of other animations inside of it
            wordPrompt.style.display = "none"
            this.removeEventListener('animationend', gameFunc);
        })
        this.removeEventListener('animationend', wordFunc);
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
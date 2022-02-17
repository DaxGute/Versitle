import inputStrip from './inputStrip.js' 

const wordPrompt = document.getElementById("wordPrompt")
const confirmWord= document.getElementById("confirmWord")

async function setupWord(socket){
    wordPrompt.style.display = "block"
    wordPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    var wordStrip = new inputStrip("newWordStrip", 0)

    var word = await waitForWord(wordStrip, socket)

    wordPrompt.style.animation = "turnToGame ease-in-out 1s forwards"
    wordPrompt.addEventListener("animationend", function wordFunc(){
        const gamePrompt = document.getElementById("gamePrompt")
        const readyPrompt = document.getElementById("readyPrompt")
        gamePrompt.style.display = "block"
        gamePrompt.style.animation = "fadeIn ease-in-out 1s forwards"
        readyPrompt.style.display = "block"
        readyPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

        //chains them one after aother
        gamePrompt.addEventListener('animationend', function gameFunc(){ //this technically triggers mutliple times because of other animations inside of it
            wordPrompt.style.display = "none"
            this.removeEventListener('animationend', gameFunc);
        })
        this.removeEventListener('animationend', wordFunc);
    })

    confirmWord.style.animation = "fadeOut ease-in-out 0.1s forwards"
    confirmWord.addEventListener('animationend', function confirmFunc(){ //this technically})
        confirmWord.style.display = "none"
        this.removeEventListener('animationend', confirmFunc);
    })

    return word
}

var word
function waitForWord(newWordStrip, socket){
    return new Promise((resolve) => {
        confirmWord.addEventListener("click", () => {
            word = newWordStrip.getStripInfo();
            socket.emit('word', word)
            socket.on("wordCheck", (canPass) => {
                if (canPass) {
                    resolve(word)
                }
            })
            
        })
    })
}

export default setupWord
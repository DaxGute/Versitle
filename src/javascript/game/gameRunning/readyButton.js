import setupGame from './setupGame.js'

const readyPrompt = document.getElementById("readyPrompt")
const readyButton = document.getElementById("readyButton")

async function readyUp(socket, word){
    readyButton.addEventListener("click", () => {
        readyButton.disabled = true
        readyButton.style.backgroundColor = "#d66666"
        readyButton.innerHTML = "Waiting on Other Player"
        socket.emit("ready")
    })

    await waitForOtherPlayer(socket, word)
    await startGame()
    console.log("finsisdhfa")
}

function waitForOtherPlayer(socket, word){
    return new Promise((resolve) => {
        socket.on("startGame", () => {
            setupGame(word)
            readyPrompt.style.animation = "fadeOut ease-in 5s forwards"
            readyPrompt.addEventListener('animationend', function readyFunc() {
                readyPrompt.style.display = "none"
                this.removeEventListener('animationend', readyFunc);
            })
            resolve()
        })
    })
}

var countdown
var interval
function startGame(){
    return new Promise((resolve) => {
        countdown = 4
        readyButton.value = "3"
        var decrementCount = function decrementCount(){
            countdown --
            readyButton.innerHTML = "Game Starts: " + countdown + "s"
            if (countdown <= 0){
                readyPrompt.style.display = "none"
                resolve()
                clearInterval(interval)
            }
        
        }
        interval = setInterval(decrementCount, 1000)
    })
}




export default readyUp
import setupGame from './setupGame.js'

const readyPrompt = document.getElementById("readyPrompt")
const readyButton = document.getElementById("readyButton")

async function readyUp(socket, word){
    readyButton.addEventListener("click", () => {
        readyButton.disabled = true
        readyButton.style.backgroundColor = "#365858"
        readyButton.innerHTML = "Waiting on Other Player"
        socket.emit("ready")
    })

    var oppStrip = await waitForOtherPlayer(socket, word)
    await preMatchStart()
    return oppStrip
    
}

function waitForOtherPlayer(socket, word){
    return new Promise((resolve) => {
        socket.on("startGame", () => {
            var oppStrip = setupGame(word)
            readyPrompt.style.animation = "fadeOut ease-in 5s forwards"
            readyButton.style.animation = "countdown ease-in-out 5s forwards"
            readyPrompt.addEventListener('animationend', function readyFunc() {
                readyPrompt.style.display = "none"
                this.removeEventListener('animationend', readyFunc);
            })
            resolve(oppStrip)
        })
    })
}

var countdown
var interval
function preMatchStart(){
    return new Promise((resolve) => {
        countdown = 4
        readyButton.value = "3"
        var decrementCount = function decrementCount(){
            countdown --
            readyButton.innerHTML = "" + countdown + "s"
            if (countdown <= 0){
                readyPrompt.style.display = "none"
                clearInterval(interval)
                resolve()
            }
        
        }
        interval = setInterval(decrementCount, 1000)
    })
}




export default readyUp
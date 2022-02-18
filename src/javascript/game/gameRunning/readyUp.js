import setupGame from './setupGame.js'

const readyPrompt = document.getElementById("readyPrompt")
const readyButton = document.getElementById("readyButton")

async function readyUp(socket, word){
    readyButton.addEventListener("click", function buttFunc() {
        readyButton.disabled = true
        readyButton.innerHTML = "Waiting on Other Player"
        socket.emit("ready")
        console.log("this bitch said it was ready")
        this.removeEventListener("click", buttFunc)
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
                console.log("disapearing")
                readyPrompt.style.display = "none"
                this.removeEventListener('animationend', readyFunc)
            })
            resolve(oppStrip)
        })
    })
}

function preMatchStart(){
    return new Promise((resolve) => {
        var countdown = 4
        var interval
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
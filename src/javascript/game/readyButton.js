const readyPrompt = document.getElementById("readyPrompt")
const readyButton = document.getElementById("readyButton")

async function readyUp(socket){
    readyPrompt.addEventListener("click", () => {
        readyButton.style.backgroundColor = "#d66666"
        readyButton.value = "Waiting on Other Player"
        socket.emit("ready")
    })

    await waitForOtherPlayer()
}

function waitForOtherPlayer(){
    return new Promise((resolve) => {
        socket.on("startGame", () => {
            console.log("startGame")
            startGame()
            resolve()
        })
    })
}

var countdown
var interval
function startGame(){
    countdown = 4
    readyButton.value = "3"
    interval = setInterval(decrementCount, 1000)
}

function decrementCount(){
    countdown --
    readyButton.value = "" + countdown
    if (countdown <= 0){
        readyPrompt.style.display = "none"
        clearInterval(interval)
    }

}


export default readyUp
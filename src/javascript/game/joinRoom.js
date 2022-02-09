import inputStrip from './inputStrip.js' 

const joinPrompt = document.getElementById("joinPrompt")
const confirmJoin = document.getElementById("confirmJoin")

function joinRoom(){
    joinPrompt.style.display = "block"
    joinPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    var joinStrip = new inputStrip("joinCodeStrip", 0)

    confirmJoin.addEventListener("click", () => {
        var code = joinStrip.getStripInfo();
        if (isCodeValid(code)){
            joinPrompt.style.animation = "fadeOut ease-in ease-out 1s forwards"
            joinPrompt.style.display = "none"
        }
    })
    joinPrompt.style.animation = ""
}

function isCodeValid(code){
    return true
}

export default joinRoom
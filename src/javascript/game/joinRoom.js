import inputStrip from './inputStrip.js' 

const joinPrompt = document.getElementById("joinPrompt")
const confirmJoin = document.getElementById("confirmJoin")

async function joinRoom(){
    joinPrompt.style.display = "block"
    joinPrompt.style.animation = "fadeIn ease-in-out 1s forwards"

    var joinStrip = new inputStrip("joinCodeStrip", 0)
    joinStrip.getInputBox(0).focus()

    var code = await waitForJoin(joinStrip)

    joinPrompt.style.animation = "fadeOut ease-in-out 1s forwards"
    joinPrompt.addEventListener("animationend", function joinFunc(){
        joinPrompt.style.display = "none"
        this.removeEventListener('animationend', joinFunc);
    })
    location.hash = code
}

// this is really interesting how promises can be used
function waitForJoin(joinStrip){
    return new Promise((resolve) => {
        document.addEventListener("keypress", function keyFunc(e) {
            if (e.code == "Enter"){
                var code = joinStrip.getStripInfo();
                if (isCodeValid(code)){
                    this.removeEventListener("keypress", keyFunc);
                    resolve(code)
                }
            }
        })
    });
}

function isCodeValid(code){
    return true
}

export default joinRoom
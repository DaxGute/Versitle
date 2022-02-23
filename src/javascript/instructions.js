const helpButton = document.getElementById("helpButton")
const helpText = document.getElementById("helpButtonText")
const closeText = document.getElementById("helpButtonClose")
const instructionsPrompt = document.getElementById("instructionsPrompt")

function instructions(){
    if (helpButton.checked){
        helpText.style.animation = "fadeOutDiff ease-in-out 0.5s forwards"
        closeText.style.animation = "fadeInDiff ease-in-out 0.5s forwards"
        instructionsPrompt.style.display = "block"
        instructionsPrompt.style.animation = "fadeInDiff ease-in-out 0.5s forwards"
    }else{
        helpText.style.animation = "fadeInDiff ease-in-out 0.1s forwards"
        closeText.style.animation = "fadeOutDiff ease-in-out 0.1s forwards"
        instructionsPrompt.style.animation = "fadeOutDiff ease-in-out 0.5s forwards"
        instructionsPrompt.addEventListener("animationend", function instrFunc(){
            instructionsPrompt.style.display = "none"
            this.removeEventListener("animationend", instrFunc)
        })
    }
}

export default instructions
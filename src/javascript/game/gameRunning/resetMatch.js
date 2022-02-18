function resetMatch(){
    document.getElementById("title").style.animation = "fadeOut ease-in-out 0.1s forwards"
    document.getElementById("scores").style.animation = "fadeOut ease-in-out 0.1s forwards"

    document.getElementById('wordleBoxes').innerHTML = ""
    document.getElementById('yourWord').innerHTML = ""
    const newWord = document.getElementById('newWordStrip')
    newWord.removeChild(newWord.firstChild)


    document.getElementById("readyButton").disabled = false
    document.getElementById("readyButton").innerHTML = "Press if Ready"
    document.getElementById("readyButton").style.animation = ""
    document.getElementById("readyButton").style.animation = ""

    // document.getElementById("readyPrompt").style.display = "block"
    document.getElementById("readyPrompt").style.animation = ""

    
    document.getElementById("wordTimer").style.animation = "fadeOut ease-in-out 0.1s forwards"

    const gamePrompt = document.getElementById('gamePrompt');
    gamePrompt.style.animation = 'fadeOut ease-in-out 1s forwards';
    gamePrompt.addEventListener('animationend', function gameFunc() {
        gamePrompt.style.display = 'none';
        this.removeEventListener('animationend', gameFunc);
    }) 
}

export default resetMatch
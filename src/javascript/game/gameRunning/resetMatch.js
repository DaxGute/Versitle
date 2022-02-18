function resetMatch(){
    document.getElementById("title").style.animation = "fadeOut ease-in-out 0.1s forwards"
    document.getElementById("scores").style.animation = "fadeOut ease-in-out 0.1s forwards"

    const wordleBoxes = document.getElementById('wordleBoxes')
    for (var i=0; i<wordleBoxes.childNodes.length; i++){
        wordleBoxes.removeChild(wordleBoxes.childNodes[i])
    }

    const oppBox = document.getElementById('yourWord')
    oppBox.removeChild(oppBox.childNodes[0])

    const newWord = document.getElementById('newWordStrip')
    while(newWord.firstChild) {
        newWord.removeChild(newWord.firstChild);
    }

    document.getElementById("readyButton").disabled = false
    document.getElementById("readyButton").innerHTML = "Press if Ready"
    document.getElementById("readyButton").style.animation = ""
    document.getElementById("readyPrompt").style.animation = "fadeIn ease-in 0.01s forwards"
    document.getElementById("readyPrompt").style.display = "block"
    
    document.getElementById("wordTimer").style.animation = "fadeOut ease-in-out 0.1s forwards"

    const gamePrompt = document.getElementById('gamePrompt');
    gamePrompt.style.animation = 'fadeOut ease-in-out 1s forwards';
    gamePrompt.addEventListener('animationend', function gameFunc() {
        gamePrompt.style.display = 'none';
        this.removeEventListener('animationend', gameFunc);
    }) 
}

export default resetMatch
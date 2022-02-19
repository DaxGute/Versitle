function resetMatch(socket) {
    socket.removeAllListeners("win")
    socket.removeAllListeners("lose")
    socket.removeAllListeners("draw")
    socket.removeAllListeners("getWordGuess")
    socket.removeAllListeners("hitMap")
    socket.removeAllListeners("oppHitMap")
    socket.removeAllListeners("nextRound")


    document.getElementById("title").style.animation = "fadeOut ease-in-out 0.1s forwards"
    document.getElementById("scores").style.animation = "fadeOut ease-in-out 0.1s forwards"

    var wordPrompt = document.getElementById("wordPrompt")
    wordPrompt.removeChild(document.getElementById('newWordStrip'));
    var newWord = document.createElement("div")
    newWord.id = "newWordStrip"
    wordPrompt.insertBefore(newWord, wordPrompt.children[1]);

    var gamePrompt = document.getElementById("gamePrompt")
    gamePrompt.removeChild(document.getElementById("wordleBoxes"))
    var wordleBoxes = document.createElement("div")
    wordleBoxes.id = "wordleBoxes"
    gamePrompt.insertBefore(wordleBoxes, gamePrompt.children[1]);

    gamePrompt.removeChild(document.getElementById('yourWord'))
    var yourWord = document.createElement("div")
    yourWord.id = "yourWord"
    gamePrompt.appendChild(yourWord);

    document.getElementById("readyButton").disabled = false
    document.getElementById("readyButton").innerHTML = "Press if Ready"
    document.getElementById("readyButton").style.animation = ""
    document.getElementById("readyButton").style.animation = ""

    // document.getElementById("readyPrompt").style.display = "block"
    document.getElementById("readyPrompt").style.animation = ""
    
    gamePrompt.removeChild(document.getElementById("wordTimer"))
    var wordTimer = document.createElement("canvas")
    wordTimer.id = "wordTimer"
    wordTimer.width = 1000
    wordTimer.height = 1000
    gamePrompt.insertBefore(wordTimer, gamePrompt.children[3]);

    gamePrompt.style.animation = 'fadeOut ease-in-out 1s forwards';
    gamePrompt.addEventListener('animationend', function gameFunc() {
        gamePrompt.style.display = 'none';
        this.removeEventListener('animationend', gameFunc);
    }) 
}

export default resetMatch
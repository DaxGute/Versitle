function resetMatch(socket) {
    document.getElementById("wordForRound").style.color = "aqua"
    document.getElementById("wordForRound").style.animation = "fadeFrames ease-in-out 3s forwards"

    var yourScore = document.getElementById("youScore").innerHTML
    var theirScore = document.getElementById("oppScore").innerHTML
    var currentRound = 1 + parseInt(yourScore.substring(5, yourScore.length)) + parseInt(theirScore.substring(5, theirScore.length))
    document.getElementById("wordForRound").innerHTML = "[ROUND " + currentRound + "]"

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
    
    document.getElementById("wordTimer").style.animation = "fadeOut ease-in-out 0.1s forwards"
    // var wordTimer = document.createElement("canvas")
    // wordTimer.id = "wordTimer"
    // wordTimer.width = 1000
    // wordTimer.height = 1000
    // gamePrompt.insertBefore(wordTimer, gamePrompt.children[3]);

    // gamePrompt.style.animation = 'fadeOut ease-in-out 1s forwards';
}

export default resetMatch
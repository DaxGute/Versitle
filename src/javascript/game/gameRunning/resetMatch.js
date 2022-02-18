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
    newWord.removeChild(newWord.childNodes[0])

    document.getElementById('confirmJoin').style.display = "block"
    document.getElementById('confirmJoin').style.opacity = 1

    document.getElementById("wordTimer").style.animation = "fadeOut ease-in-out 0.1s forwards"

    const gamePrompt = document.getElementById('gamePrompt');
    gamePrompt.style.animation = 'fadeOut ease-in-out 1s forwards';
    gamePrompt.addEventListener('animationend', function gameFunc() {
        gamePrompt.style.display = 'none';
        this.removeEventListener('animationend', gameFunc);
    }) 
}

export default resetMatch
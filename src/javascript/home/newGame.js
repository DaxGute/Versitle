const prompt = document.getElementById('prompt')

function newGame(){
    prompt.style.animation = "turnToGame 1s ease-in-out forwards"
    prompt.addEventListener('animationend', () => {
        const randInt = Math.floor(Math.random() * 100000)
        document.location.href = "./code#"+randInt
    })
}

export default newGame
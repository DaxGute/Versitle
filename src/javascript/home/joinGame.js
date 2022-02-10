const prompt = document.getElementById('prompt')

function joinGame(){
    prompt.style.animation = "turnToGame 1s ease-in-out forwards"
    prompt.addEventListener('animationend', () => {
        document.location.href = "./code"
    })
}

export default joinGame


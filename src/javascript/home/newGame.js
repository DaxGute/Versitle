const prompt = document.getElementById('prompt')

function newGame(){
    prompt.style.animation = "turnToGame 1s ease-in-out forwards"
    prompt.addEventListener('animationend', () => {
        const randString = generateString(5)
        document.location.href = "./code#"+randString
    })
}

const characters ='abcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


export default newGame
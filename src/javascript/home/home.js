const newGame = document.getElementById("newGame")
const joinGame = document.getElementById("joinGame")

import joinGameCode from "./joinGame.js"
import newGameCode from "./newGame.js"
import instructions from "../instructions.js"

document.getElementById("helpButton").addEventListener("click", ()=>{
    instructions()
})

joinGame.addEventListener("click", () => {
    joinGameCode()
})
newGame.addEventListener("click", () => {
    newGameCode()
})
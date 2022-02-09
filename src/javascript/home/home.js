const newGame = document.getElementById("newGame")
const joinGame = document.getElementById("joinGame")

import joinGameCode from "./joinGame.js"
import newGameCode from "./newGame.js"

joinGame.addEventListener("click", () => {
    joinGameCode()
})
newGame.addEventListener("click", () => {
    newGameCode()
})
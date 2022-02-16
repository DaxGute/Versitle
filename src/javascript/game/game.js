import joinRoom from './joinRoom.js'
import inputStrip from './inputStrip.js'
import setupWord from './setupWord.js'
import runGame from './gameRunning/runGame.js'
import readyUp from './gameRunning/readyButton.js'

const socket = io();

inputStrip.setWindow(document)

if (location.hash == ""){ // check for if the hash code is valid
   joinRoom().then(() => {
      setupUser()
   }
)
}else{
   setupUser()
}


function setupUser(){
   socket.on('playerCount', (playerCountPass) => {
      if (playerCountPass) {
         startMatch()
      } else{
         console.log("ERROR: TOO MANY PLAYERS")
      }
   })

   socket.emit('joinRoom', location.hash)
}

async function startMatch() {
   var notEndGame = true
   while (notEndGame) {
      var word = await setupWord()
      socket.emit('word', word)
      var oppStrip = await readyUp(socket, word)
      await runGame(oppStrip, socket, word)
   }
}





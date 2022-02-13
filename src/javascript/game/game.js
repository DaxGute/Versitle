import joinRoom from './joinRoom.js'
import inputStrip from './inputStrip.js'
import setupWord from './setupWord.js'
import setupGame from './runGame.js'
import readyUp from './readyButton.js'

const socket = io();

var playerCountPass = false


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
         setupWord().then((word) => {
            socket.emit('word', word)
            //checks that there are not too many players

            readyUp().then(()=>{
               setupGame(word)
            })
         })
      } else{
         console.log("ERROR: TOO MANY PLAYERS")
      }
   })

   socket.emit('joinRoom', location.hash)
}



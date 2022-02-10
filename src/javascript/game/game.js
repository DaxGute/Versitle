const socket = io()
import joinRoom from './joinRoom.js'
import inputStrip from './inputStrip.js'
import setupWord from './setupWord.js'

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
   setupWord().then((word) => {
      console.log(word)
   })
}



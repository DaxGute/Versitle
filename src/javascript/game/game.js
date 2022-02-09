const socket = io()
import inputStrip from './inputStrip.js' 
import joinRoom from './joinRoom.js'
import setupWord from './setupWord.js'

inputStrip.setWindow(document)

if (location.hash == ""){
   joinRoom()
}else{
    setupWord()
}




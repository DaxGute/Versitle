var http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const port =  "8000";

app.use(express.static(path.join(__dirname, './src')))

const server = http.createServer(app) 

server.listen(3000, () => {
  console.log("Server Running")
})

app.set("view engine", "ejs")
// const {PythonShell} =require('python-shell');

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname + '/src/pages/home'))
});

app.get('/code', (req, res) => {
  res.render(path.resolve(__dirname + '/src/pages/game'))
});

/**
 * THIS NEXT PART IS VERY INEFFICIENT
**/

const io = require("socket.io")(server)
io.on('connection', socket => {
  socket.word = ""
  socket.ready = false
  socket.room = ""
  socket.partner = undefined
  socket.won = 0

  socket.on('joinRoom', (room) => {
    room = room.substring(1, room.length)
    socket.room = room

    var playerCountsCorrect = () => {
      socket.join(room)
      socket.emit('playerCount', true)
      runGame(socket)
    }

    //sorta lazy coding to decide whether or not a player should be let in
    try{
      if (io.sockets.adapter.rooms.get(room).size < 2){
        var partnerSocket
        for (const clientId of io.sockets.adapter.rooms.get(room)) {
          var partnerSocket = io.sockets.sockets.get(clientId);
        }
        socket.partner = partnerSocket
        socket.partner.partner = socket
        playerCountsCorrect()
      } else {
        //too many players
        socket.emit('playerCount', false)
      }
    }catch (err){
      playerCountsCorrect()
    }


    socket.on('ready', () => {
      socket.ready = true
      if (socket.partner != undefined){
        if (socket.ready && socket.partner.ready){
          io.to(room).emit('startGame')
        }
      }
    })
    socket.on('word', (newWord) => {
      socket.word = newWord
    })
  })

  socket.on('disconnect', () => {
    if (socket.partner != undefined){
      socket.partner.partner = undefined
    }
  })
})

function runGame(socket){
  var timerInterval = setInterval(() => {
    socket.emit('getWord')
  }, 10000)

  socket.on('wordGuess', (word) => {
    socket.numMatch = -1
    //make sure that it is 6 characters long
    var newString = ""
    var partWordList = []
    var guessWordList = []
    for (var i = 0; i < 6; i++){
      partWordList.push(socket.partner.word.substring(i, 1))
      guessWordList.push(word.substring(i, 1))
    }

    var numMatch = 0 
    for (var i = 0; i < 6; i++){
      if (partWordList[i] == guessWordList[i]) {
        numMatch++ 
        newString += guessWordList[i].toUpperCase()
      }else if (guessWordList[i] in partWordList) {
        newString += guessWordList[i]
      }else{
        newString += "_"
      }
    }
    socket.numMatch = numMatch

    socket.emit("hitMap", newString)
    socket.to(socket.room).emit("oppHitMap", newString)
    if (socket.partner.numMatch != -1){
      socket.win += 1
      if (socket.numMatch > socket.partner.numMatch) {
        socket.emit("win", socket.win, socket.partner.win)
        socket.to(socket.room).emit("lose", socket.partner.win, socket.win)
      }else if (socket.numMatch < socket.partner.numMatch) {
        socket.partner.win += 1
        socket.emit("lose", socket.win, socket.partner.win)
        socket.to(socket.room).emit("win", socket.partner.win, socket.win)
      }else {
        socket.win += 0.5
        socket.partner.win += 0.5
        socket.emit("draw", socket.win, socket.partner.win)
        socket.to(socket.room).emit("draw", socket.partner.win, socket.win)
      }
      clearInterval(timerInterval)
    }
    
  })
}
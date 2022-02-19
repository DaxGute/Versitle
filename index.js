var http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const port =  "8000";

app.use(express.static(path.join(__dirname, './src')))

const server = http.createServer(app) 

server.listen(8080, () => {
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
const isWordReal = require('./src/javascript/home/checkDict');
const e = require("cors");
io.on('connection', socket => {
  socket.word = ""
  socket.ready = false
  socket.room = ""
  socket.partner = undefined
  socket.win = 0

  socket.on('joinRoom', (room) => {
    room = room.substring(1, room.length)
    socket.room = room


    var playerCountsCorrect = () => {
      socket.join(room)
      socket.emit('playerCount', true)
      runGame(socket)
    }

    //sorta lazy coding to decide whether or not a player should be let in
    if (io.sockets.adapter.rooms.get(room) == undefined) {
      playerCountsCorrect()
    }else if (io.sockets.adapter.rooms.get(room).size < 2){
      for (const clientId of io.sockets.adapter.rooms.get(room)) {
        socket.partner = io.sockets.sockets.get(clientId);
      }
      socket.partner.partner = socket
      playerCountsCorrect()
    } else {
      //too many players
      socket.emit('playerCount', false)
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
      if (isWordReal(newWord)) {
        socket.word = newWord
        socket.emit('wordCheck', true)
      }else{
        socket.emit('wordCheck', false)
      }
    })
  })

  socket.on('disconnect', () => {
    if (socket.partner != undefined){
      socket.to(socket.room).emit("win", socket.partner.win, socket.win)
      socket.partner.partner = undefined
    }
  })
})

function runGame(socket){
  var firstTime = true
  socket.on('playerStarted', () => {

    socket.timerInterval = setInterval(() => {
      socket.emit('getWordGuess')
    }, 10000)

  
    if (firstTime){
      socket.on('wordGuess', (word) => {
        for (var i = 0; i < 5 - word.length; i++) {
          word += " "
        }
        socket.numMatch = undefined
        //make sure that it is 5 characters long
        var newString = ""
        var partWordList = []
        var guessWordList = []
        for (var i = 0; i < 5; i++){
          partWordList.push(socket.partner.word.substring(i, i+1))
          guessWordList.push(word.substring(i, i+1))
        }

        var numMatch = 0 
        for (var i = 0; i < 5; i++){
          if (partWordList[i] == guessWordList[i]) {
            numMatch++ 
            newString += guessWordList[i].toUpperCase()
          }else{
            var guessFrag = guessWordList[i]
            var guessFragNotFound = true
            for (var j = 0; j < 5; j++) {
              if (guessFrag == partWordList[j] && guessFragNotFound) {
                newString += guessFrag
                guessFragNotFound = false
              }
            }
            if (guessFragNotFound) {
              newString += "_"
            }
          }
        }
        socket.numMatch = numMatch

        socket.emit("hitMap", newString)
        socket.to(socket.room).emit("oppHitMap", newString)

        // console.log("Partner: " + socket.partner.numMatch)
        // console.log("You:     " + socket.numMatch)
        if ((socket.partner.numMatch == 5 || socket.numMatch == 5) && (socket.numMatch!=undefined && socket.partner.numMatch!=undefined)){
          clearInterval(socket.timerInterval)
          clearInterval(socket.partner.timerInterval)
          socket.ready = false
          socket.partner.ready = false
          if (socket.numMatch > socket.partner.numMatch) {
            socket.win += 1
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
          socket.numMatch = undefined
          socket.partner.numMatch = undefined
        }else{
          socket.emit("nextRound")
        }
      })
      firstTime = false
    }
  })
}

module.exports = server;
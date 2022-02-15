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

const allSocketsReady = {}
const allSocketsWords = {}

const io = require("socket.io")(server)
io.on('connection', socket => {
  socket.word = ""
  socket.ready = false
  socket.room = ""
  socket.on('joinRoom', (room) => {
    room = room.substring(1, room.length)
    socket.room = room
    allSocketsReady[room] = []
    allSocketsWords[room] = []


    var playerCountsCorrect = () => {
      socket.join(room)
      socket.emit('playerCount', true)
      runGame(socket)
    }
    //sorta lazy coding to decide whether or not a player should be let in
    try{
      if (io.sockets.adapter.rooms.get(room).size < 2){
        playerCountsCorrect()
      } else {
        //too many players
        socket.emit('playerCount', false)
      }
    }catch{
      playerCountsCorrect()
    }


    socket.on('ready', () => {
      allSocketsReady[room].push(true)
      socket.ready = true
      console.log("room: " + room)
      console.log(allSocketsReady[room])
      if (allSocketsReady[room][0] && allSocketsReady[room][1]){
        io.to(room).emit('startGame')
      }
    })
    socket.on('word', (newWord) => {
      socket.word = newWord
      allSocketsWords[socket.room].push(newWord)
    })
  })

  socket.on('disconnect', () => {
    console.log("disconnect")
    if (socket.ready) {
      allSocketsReady[socket.room].pop()
    }
  })
})

function runGame(socket){
  socket.on('wordGuess', (word) => {
    
  })
}
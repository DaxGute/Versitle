var http = require("http");
const socketio = require("socket.io")
const express = require("express");
const path = require("path");

const app = express();
const port =  "8000";

app.use(express.static(path.join(__dirname, './src')))

const server = http.createServer(app) 

server.listen(3000, () => {
  console.log("Server Running")
})

const io = socketio(server)

app.set("view engine", "ejs")
// const {PythonShell} =require('python-shell');

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname + '/src/pages/home'))
});
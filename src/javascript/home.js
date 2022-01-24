var canvas = document.getElementById('backgroundCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext('2d')

const socket = io()

canvasAnimationFrames()
// updateBox()

// function updateBox(){
   
//         document.getElementById("choiceBox").classList.add("fade-in")
//         document.getElementById("choiceBox").classList.remove("fade-out")

// }

// I am gona make this into ultra speed read: like it identifies the main ideas


requestAnimationFrame(canvasAnimationFrames);
var startTime = Date.now()
var pos = 1000
var currentVel = 0
var mousehasmoved = false
function canvasAnimationFrames() {
    var endTime = Date.now()
    var difference = endTime - startTime
    if (difference > (1/30)) {
        ctx.fillStyle = "#FFE3F8" // pink
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (mousehasmoved){
            pos += currentVel
        }
        pos += 1

        // ctx.fillStyle = "rgb(" + (72 + (pos/200%20)) + ", " + (200 + (pos/100%20)) + ", "  + (169 - (pos/200%20)) + ")" 
        drawLoops(pos)
    }
    mousehasmoved = false
    requestAnimationFrame(canvasAnimationFrames);
}

window.onresize = windowResized;
function windowResized(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

document.addEventListener('mousemove', e => {
    currentVel = Math.sqrt(Math.pow(e.movementX,2) + Math.pow(e.movementY,2))
    mousehasmoved = true;
  });

var circles = []
function drawLoops(pos){ //TODO: it isn't completely smooth
    var width = window.innerWidth
    var height = window.innerHeight
    ctx.fillStyle = "#FC7C68" // more red
    ctx.strokeStyle = "#FC7C68"
    circles.push(new circleDrawing(width, height))
    ctx.lineWidth = 5
    var deleteCircles = []
    for (var i = 0; i < circles.length; i++){
        circles[i].circleUpdates(ctx)
        if (circles[i].shouldDelete){
            deleteCircles.push(i)
            console.log(i)
        }
    }
    for (var i = 0; i < deleteCircles.length; i++){
        circles.splice(deleteCircles[i], 1)
        deleteCircles.splice(i, 1)
    }
    
}

class circleDrawing{
    constructor(width, height) {
        this.x = Math.floor(Math.random()*width); 
        this.y = Math.floor(Math.random()*height); 
        if (width > height){
            this.maxRad = (height)*Math.random()/10
        }else{
            this.maxRad = (width)*Math.random()/10
        }
        // console.log(this.maxRad)
        this.rad = 1
        this.expanding = true
        this.shouldDelete = false
    }
    circleUpdates(ctx){
        this.drawCircle(ctx)
        this.updateCircle()
    }
    updateCircle(){
        if (this.expanding){
            this.rad += 0.1
        }else{
            this.rad -= 1
        }

        if (this.rad > this.maxRad){
            this.expanding = false
        }
    }
    drawCircle(ctx){
        ctx.beginPath()
        try {
            ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
        } catch (error) {
            this.shouldDelete = true
        }
        ctx.fill();
    }
}
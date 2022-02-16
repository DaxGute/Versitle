const timer = document.getElementById('wordTimer')
const ctx = timer.getContext('2d')

function canvasAnimationFrames(secLeft) {
    ctx.clearRect(0, 0, timer.width, timer.height);
    var radius;
    if (timer.width > timer.height) {
        radius = timer.height/2
    }else{
        radius = timer.width/2
    }
    ctx.beginPath();
    ctx.arc(timer.width/2, timer.height/2, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#284141';
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    var newAngle = (secLeft/10000)*Math.PI*2
    ctx.arc(timer.width/2, timer.height/2, radius/2, 0, newAngle);
    ctx.strokeStyle = '#2E362B';
    ctx.lineWidth = radius
    ctx.stroke();

    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "80px Arial";
    var text = "" + (Math.round(secLeft/1000))
    ctx.fillText(text, timer.width/2, timer.height/2);
}   

function startTimer(){
    return new Promise((resolve) => {
        var interval
        var secLeft = 10000
        var decreaseTimer = function decreaseTimer(){
            secLeft -= 10
            canvasAnimationFrames(secLeft)
            if (secLeft <= 0) {
                resolve()
                clearInterval(interval)
            }
        }
        interval = setInterval(decreaseTimer, 10)
    })
}


export default startTimer
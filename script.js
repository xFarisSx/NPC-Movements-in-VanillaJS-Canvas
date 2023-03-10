/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 700;
CANVAS_HEIGHT = canvas.height = 760;
const enemyNumber = 200
const enemies = []

let dt1 = new Date().getTime()
let dt2 = new Date().getTime()
let dt = (dt2 - dt1)/1000

class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = "enemy3.png"
        this.speed = Math.random() * 400 + 100
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.width = this.spriteWidth/2
        this.height = this.spriteHeight/2
        this.frame = 0
        this.frameSpeed = Math.round(Math.random() * 10 + 5)
        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)
        this.angle = Math.random() * 2 
        this.angleSpeed = Math.random() * 100 + 50
        this.curve = Math.random() * 200 + 50
    } 
    
    update() {
        this.x = canvas.width/2* Math.cos(this.angle * Math.PI/90)+ canvas.width/2- this.width/2
        this.y =canvas.height/2* Math.sin(this.angle * Math.PI/270)+ canvas.width/2- this.width/2
        this.angle += this.angleSpeed* dt
        if(this.x + this.width < 0) this.x = canvas.width

        this.frame > 4 ? this.frame = 0 : this.frame+=this.frameSpeed * dt
    }

    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, Math.round(this.frame)*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}
for(let i = 0; i< enemyNumber;i++){
    enemies.push(new Enemy())
}

function animate(){
    dt2 = new Date().getTime()
    dt = (dt2 - dt1)/1000
    dt1 = new Date().getTime()
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemies.forEach((en) => {
        en.draw()
        en.update()
    })
    requestAnimationFrame(animate)
}
animate()
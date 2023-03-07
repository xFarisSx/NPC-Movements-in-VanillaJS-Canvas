/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 700;
CANVAS_HEIGHT = canvas.height = 760;
const enemyNumber = 20
const enemies = []

let dt1 = new Date().getTime()
let dt2 = new Date().getTime()
let dt = (dt2 - dt1)/1000

let gameFrame = 0

class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = "enemy4.png"
        this.speed = Math.random() * 400 + 100
        this.spriteWidth = 213
        this.spriteHeight = 213
        this.width = this.spriteWidth/2
        this.height = this.spriteHeight/2
        this.frame = 0
        this.frameSpeed = Math.round(Math.random() * 10 + 5)
        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)

        this.newX = Math.random() * (canvas.width- this.width)
        this.newY = Math.random() * (canvas.height- this.height)
        this.smooth = 0.01
        this.interval = Math.round(Math.random() * 200 + 50)
    } 
    
    update() {
        if(gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width)
            this.newY = Math.random() * (canvas.height - this.height)
        }
        let dx = this.x - this.newX
        let dy = this.y - this.newY
        this.x -= dx * this.smooth
        this.y -= dy * this.smooth
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
    gameFrame++
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemies.forEach((en) => {
        en.draw()
        en.update()
    })
    requestAnimationFrame(animate)
}
animate()
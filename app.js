
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function resizeCanvas(margin) {
  canvas.width = window.innerWidth - margin
  canvas.height = window.innerHeight - margin
  return canvas.width < canvas.height ? canvas.width : canvas.height
}

const maxWidth = resizeCanvas(5)

function clearCanvas() {
  context.save()
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function radToDeg(rad) {
  return rad * (180 / Math.PI)
}

class Ring {
  constructor(canvas, context, maxWidth) {
    this.canvas = canvas
    this.context = context
    this.angle = Math.PI * 2 * Math.random()
    this.angleVelocity = 0.001
    this.x = 0
    this.xVelocity = 1 * Math.random()
    this.maxWidth = maxWidth
    this.radius = this.maxWidth / 30
  }

  draw({canvas, context} = this) {
    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate(this.angle)
    context.beginPath()
    context.arc(this.x, 0, this.radius / (this.maxWidth / 2 / this.x), 0, 2 * Math.PI)
    context.stroke()
    context.restore()
  }

  move() {
    this.angle += this.angleVelocity
    this.x += this.xVelocity
    if(this.x > this.maxWidth / 2) {
      this.x = 0
    }
  }

  animate() {
    this.move()
    this.draw()
  }
}


const rings = []
for(let i = 0; i < 100; i++) {
  rings.push(new Ring(canvas, context, maxWidth))
}




let fps = 30; // Set the desired FPS
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

function loop() {
  now = Date.now();
  delta = now - then;


  clearCanvas()
  rings.forEach(e => e.animate())


  if (delta > interval) {
    then = now - (delta % interval);
    requestAnimationFrame(loop);
  } else {
    setTimeout(() => {
      requestAnimationFrame(loop);
    }, interval - delta);
  }
}

loop(); // Start the animation loop

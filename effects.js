// === Animierter Himmel mit bewegenden Wolken ===

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Cloud {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.6;
    this.size = 80 + Math.random() * 200;
    this.speed = 0.2 + Math.random() * 0.4;
    this.opacity = 0.3 + Math.random() * 0.3;
  }

  update() {
    this.x += this.speed;
    if (this.x - this.size > canvas.width) {
      this.x = -this.size;
      this.y = Math.random() * canvas.height * 0.6;
      this.size = 80 + Math.random() * 200;
      this.speed = 0.2 + Math.random() * 0.4;
      this.opacity = 0.3 + Math.random() * 0.3;
    }
  }

  draw() {
    const grad = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.3,
      this.x, this.y, this.size
    );
    grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const clouds = Array.from({ length: 12 }, () => new Cloud());

function draw() {
  // Himmel leicht verlaufend nachmalen
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, "#5ab0ff");
  sky.addColorStop(1, "#d6ecff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });

  requestAnimationFrame(draw);
}

draw();

const numberOfSnowflakes = 300;
const maxSnowflakeSize = 5;
const snowflakeColor = "#ddd";
const snowflakes = [];

// Crear el elemento canvas
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Crear los copos de nieve
function createSnowflakes() {
  for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * maxSnowflakeSize,
      speed: Math.random() * 1 + 0.5,
      drift: Math.random() * 1 - 0.5,
    });
  }
}

// Dibujar y actualizar los copos de nieve
function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = snowflakeColor;

  snowflakes.forEach((snowflake) => {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateSnowflakes() {
  snowflakes.forEach((snowflake) => {
    snowflake.y += snowflake.speed;
    snowflake.x += snowflake.drift;

    if (snowflake.y > canvas.height) {
      snowflake.y = 0;
      snowflake.x = Math.random() * canvas.width;
    }

    if (snowflake.x > canvas.width || snowflake.x < 0) {
      snowflake.x = Math.random() * canvas.width;
    }
  });
}

function animateSnow() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnow);
}
function isChristmasSeason() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 11, 1);
  const end = new Date(now.getFullYear(), 0, 7);
  return now >= start || now <= end;
}

if (isChristmasSeason()) {
  createSnowflakes();
  animateSnow();

  // Ajustar el canvas al redimensionar
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes.length = 0;
    createSnowflakes();
  });
} else {
  canvas.style.display = "none";
}

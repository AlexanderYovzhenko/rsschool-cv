const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;
ctx.globalCompositeOperation = 'source-over';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//palette
const line = document.querySelectorAll('.line');
const color = document.querySelectorAll('.color');
const effect = document.querySelectorAll('.effect');

//width line
for(let el of line) {
    el.addEventListener('click', function switchLine() {
        ctx.lineWidth = el.dataset.line;
    });
}

//color
for(let el of color) {
    el.addEventListener('click', function switchColor() {
        hue = el.dataset.color;
  });
}

//effect
for(let el of effect) {
    el.addEventListener('click', function switchEffect() {
        ctx.globalCompositeOperation = el.dataset.effect;
  });
}

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
 
}   

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
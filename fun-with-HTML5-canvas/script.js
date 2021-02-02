const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.globalCompositeOperation = 'source-over';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//palette
const lineSizeElements = document.querySelectorAll('.width-line');
const lineColorElements = document.querySelectorAll('.color-line');
const lineEffectElements = document.querySelectorAll('.effect-line');
const listTextColors = document.querySelectorAll('.color-element');
const lineSizeElementRange = document.querySelector('.width-line-range');

//width line
for(let el of lineSizeElements) {
    el.addEventListener('click', function switchSizeLine(e) {
        ctx.lineWidth = e.currentTarget.dataset.line;
        lineSizeElementRange.value = ctx.lineWidth;
    });
}

//width line range
lineSizeElementRange.addEventListener('mousemove', () => {
  ctx.lineWidth = lineSizeElementRange.value;
});

//color
for(let el of lineColorElements) {
    el.addEventListener('click', function switchColor(e) {
        hue = e.currentTarget.dataset.color;
  });
}

//color text
for(let el of listTextColors) {
   el.style.color = el.innerText;  
}

//effect
for(let el of lineEffectElements) {
    el.addEventListener('click', function switchEffect(e) {
        ctx.globalCompositeOperation = e.currentTarget.dataset.effect;
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

function isNotDrawing() {
 return isDrawing = false;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', isNotDrawing);
canvas.addEventListener('mouseout', isNotDrawing);

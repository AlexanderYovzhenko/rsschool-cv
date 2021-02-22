const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const levels = document.querySelectorAll('.level');
const startButton = document.querySelector('.start-button');
const recordText = document.querySelector('.record-text');
const seeTimeLevel = document.querySelector('.time');

let lastHole;
let timeUp = true;
let score = 0;
let scoreGlobal;
let minTime = 0;
let maxTime = 0;
let level = 0;
let timerSecond;
let timeLevel;
let moleTime;
let hole = randomHole(holes);

function levelTimeCalc() { 
   timerSecond = setInterval(() => {
    if(+seeTimeLevel.innerText > 0) {
      seeTimeLevel.innerText -= 1;  
    }
  }, 1000); 
}

function levelSelection(e) {
  clearInterval(timerSecond);
  clearTimeout(timeLevel);
  level = +e.target.dataset.level;
  localStorageRecord();
  levelSelectionLook(e);
  seeTimeLevel.innerText = `choose level`;
  switch(level) {
    case 1:
      minTime = 900;
      maxTime = 1000;
      break; 
   
    case 2: 
      minTime = 800;
      maxTime = 900; 
      break;    
   
    case 3: 
      minTime = 700;
      maxTime = 800;
      break; 
  }  
}

function levelSelectionLook(e) {
    timeUp = true;
    e.target.classList.add('active-button');
    for(let i of levels) {
      if(level === +i.dataset.level) continue;
      i.classList.remove('active-button') 
    } 
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
 
function peep() {
  const time = randomTime(minTime, maxTime);
  hole = randomHole(holes); 
  hole.classList.add('up');
  moleTime = setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}
 
function startGame() {
  if(level !== 0) { 
  clearTimeout(moleTime);
  clearTimeout(timeLevel);
  hole.classList.remove('up');  
  clearInterval(timerSecond);
  seeTimeLevel.innerText = 20;
  levelTimeCalc();  
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  timeLevel = setTimeout(() => {timeUp = true, seeTimeLevel.innerText = 'Game over!'}, 20000);
  peep();
} else {
  seeTimeLevel.innerText += '!';  
  }
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  scoreGlobal = score;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score; 
  localStorageRecord();
}

function localStorageRecord() {
  if(+localStorage.getItem(level) < scoreGlobal) {
    localStorage.setItem(level, scoreGlobal); 
    recordText.innerText = `You record  in level: ${localStorage.getItem(level)}`; 
    scoreGlobal = 0;
    }
  else {
    recordText.innerText = `You record in level: ${+localStorage.getItem(level)}`;
  }
}

localStorageRecord();

//levels
for(let e of levels) {
    e.addEventListener('click', levelSelection);
}

moles.forEach(mole => mole.addEventListener('click', bonk));
 
startButton.addEventListener('click', startGame);

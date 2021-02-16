const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const levels = document.querySelectorAll('.level');
const startButton = document.querySelector('.start-button');
const recordText = document.querySelector('.record-text');
const seeTimeLevel = document.querySelector('.time');

let lastHole;
let timeUp = false;
let score = 0;
let scoreGlobal;
let minTime = 0;
let maxTime = 0;
let startGameActive = false;
let level;
let timerSecond;
let timeLevel;

function levelTimeCalc() { 
   timerSecond = setInterval(() => {
    if(+seeTimeLevel.innerText > 0) {
      seeTimeLevel.innerText -= 1  
    }
  }, 1000); 
}

function levelSelection(e) {
  level = +e.target.dataset.level;
  localStorageRecord();
  levelSelectionLook(e);
  seeTimeLevel.innerText = `choose level`;
  clearInterval(timerSecond);
  clearTimeout(timeLevel);
  switch(level) {
    case 1:
      minTime = 700;
      maxTime = 800;
      break; 
   
    case 2: 
      minTime = 600;
      maxTime = 700; 
      break;    
   
    case 3: 
      minTime = 500;
      maxTime = 600;
      break; 
  }  
}

function levelSelectionLook(e) {
    timeUp = true;
    startGameActive = false;
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
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}
 
function startGame() {
  clearInterval(timerSecond);
  seeTimeLevel.innerText = 20;
  levelTimeCalc();
  if(startGameActive === true) return;  
  startGameActive = true;  
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  timeLevel = setTimeout(() => {timeUp = true, startGameActive = false, seeTimeLevel.innerText = 'Game over!'}, 20000);
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

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const levels = document.querySelectorAll('.level');
const startButton = document.querySelector('.start-button');
const recordText = document.querySelector('.record-text');

let lastHole;
let timeUp = false;
let score = 0;
let minTime = 0;
let maxTime = 0;
let levelTime = 10000;
let startGameActive = false;
let record = localStorage;

function levelSelection(e) {
  if(+e.target.dataset.level === 1) {
      minTime = 1000;
      maxTime = 1500;
      levelSelectionLook(e);  
  }  
  if(+e.target.dataset.level === 2) {
      minTime = 500;
      maxTime = 1000; 
      levelSelectionLook(e);    
  }  
  if(+e.target.dataset.level === 3) {
      minTime = 200;
      maxTime = 500;
      levelSelectionLook(e); 
  }     
}

function levelSelectionLook(e) {
    timeUp = true;
    startGameActive = false;
    e.target.classList.add('active-button');
    for(let i of levels) {
      if(+e.target.dataset.level === +i.dataset.level) continue;
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
  if(startGameActive === true) return;  
  startGameActive = true;  
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {timeUp = true, startGameActive = false}, levelTime);
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score; 
  localStorageRecord();
}

function localStorageRecord() {
    if(record.getItem('record') === ('' || null)) {
      record.setItem('record', score); 
      recordText.innerText = `You record: ${record.getItem('record')}`; 
  } 
    else if(+record.getItem('record') < score) {
      record.setItem('record', score); 
      recordText.innerText = `You record: ${record.getItem('record')}`; 
    }
    else {
      recordText.innerText = `You record: ${record.getItem('record')}`;
    }
}

localStorageRecord();

//levels
for(let e of levels) {
    e.addEventListener('click', levelSelection);
}

moles.forEach(mole => mole.addEventListener('click', bonk));
 
startButton.addEventListener('click', startGame);

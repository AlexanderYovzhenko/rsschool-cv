
// wrapper
const wrapper = document.querySelector('.wrapper');

//game field
const gameField = document.querySelector('.game-field');
const background = document.querySelector('.background');
const mathProblem = document.querySelector('.math-problem');
const waterLevel = document.querySelector('.water-level');

//start game
const startButtons = document.querySelector('.start-buttons');
const startButton = document.querySelector('.start');
const buttonHowToPlay = document.querySelector('.how-to-play');

//result
const result = document.querySelector('.result');
const resetGame = document.querySelector('.reset-game');
const complexity = document.querySelector('.complexity');
const scoreResult = document.querySelector('.score-result');
const right = document.querySelector('.right');


//calculated field
const scoreScreen = document.querySelector('.score-screen');
const fullScreen = document.querySelector('.full-screen');
const scoreLives = document.querySelector('.score-lives');

//calculation
const calculation = document.querySelector('.calculation');
const scoreboard = document.querySelector('.scoreboard-number');
const buttons = document.querySelectorAll('.button');

//settings game
const settings = document.querySelector('.settings');
const arithmeticOperations = document.querySelectorAll('.arithmetic-operation');
const limitsOne = document.querySelectorAll('.limit-one');
const limitsTwo = document.querySelectorAll('.limit-two');

//change topic
const changeTopicButton = document.querySelector('.change-topic-button');
const backgroundSound = document.querySelector('.background-sound');

let timeCreateRainDrop;
let newRainDrop;
let position = 55;
let dropTime = 18000;
let mistakes = 0;
let waterLevelPercent = 1;
let start = Date.now();
let timerMistakes;
let dropСounter = 0;
let expressionResult;
let arrayResult = [];
let arrayValueDrop = [];
let arrayTimeStartDrop = [];
let arrayNewRainDrop = [];
let arrayChecked;
let correctAnswers = 0;
let rainDropBonus = 0;
let randomNumberBonus;
let indexTenOneHundred = 5;
let indexTen = 2; 

let operator;
let operandOne;
let operandTwo;
let limitOperandOne = 2;
let limitOperandTwo = 2;
let selectOperator = '+';

let score = 0;
let success = false;

let numberOfPoints = 10;
    

//start the game
function startToGame() {
    expressionSettingsOne();
    expressionSettingsTwo();
    expressionSettingsOperator();
    fullToScreen();
    pressingButtons();
    scoreToScreen();
    changeTopic();
    startButton.addEventListener('click', () => {
        startButtons.classList.add('hidden');
        startRaining();
    });  
}


//start raining
function startRaining() {
    createRainDrop();
    timeCreateRainDrop = setInterval(() => {
        createRainDrop();  
    }, 3000);
    start = Date.now();
    checkRainDrops();
}


//random numbers
function randomGenerator(e) {
    return Math.floor(Math.random() * Math.floor(e));
}


//create rain drop bonus
function rainDropBonusCalc() {
    if(rainDropBonus === randomNumberBonus) {
        newRainDrop.classList.add('rain-drop-bonus');
        newRainDrop.style.value = true;
        if(indexTenOneHundred > 1) indexTenOneHundred--;    
        if(indexTen > 1) indexTen--;    
    }  
}


//create rain drop
function createRainDrop() {
    dropСounter++;
    rainDropBonus++;
    newRainDrop = document.createElement('div');
    rainDropBonusCalc();
    if(rainDropBonus === 8) {
        randomNumberBonus = randomGenerator(6);
        rainDropBonus = 0;
    }                        
    newRainDrop.style.transitionDuration = dropTime + 'ms';              
    arrayNewRainDrop.push(newRainDrop);
    newRainDrop.classList.add('rain-drop');
    newRainDrop.setAttribute('value', dropСounter);
    newRainDrop.innerHTML = '<div class="math-problem">'+expressionGenerator()+'</div>'
    background.prepend(newRainDrop);
    newRainDrop.style.left = randomGenerator(position) + '%';
    setTimeout(() => {
        if(window.innerWidth <= 600) {
            newRainDrop.style.top = '75%'
        } else {
            newRainDrop.style.top = '87%'
        }
        }, 20);      
    arrayValueDrop.push(dropСounter);
    arrayTimeStartDrop.push(Date.now()); 
}


// quantities lives calc
function  calcQuantitiesLives() {
    let arrayLives = scoreLives.innerHTML.split(' ');
    arrayLives.pop();
    scoreLives.innerHTML = arrayLives.join(' ')
}


// check rain drops
const soundFal = new Audio();
function checkRainDrops() {
    timerMistakes = setInterval(function() {       
        let timePassed = Date.now() - start;
        if(timePassed >= dropTime) {
            arrayResult = [];
            arrayValueDrop = [];
            arrayTimeStartDrop = [];
            arrayNewRainDrop = [];
            mistakes += 1;
            waterLevel.style.flexGrow = `${waterLevelPercent += 1}`;
            document.querySelectorAll('.rain-drop').forEach(element => {
                element.classList.add('rain-drop-fal');
            });
            success = false;
            soundFal.preload = 'auto';
            soundFal.src = './raindrops/sound/bef16b53f907d85.mp3';
            soundFal.play();
            calcQuantitiesLives();
            calculateScore(); 
            clearInterval(timeCreateRainDrop);
            clearInterval(timerMistakes);
            startRaining(); 
        
            if(mistakes >= 3) {
                newRainDrop.remove();
                clearInterval(timeCreateRainDrop);
                clearInterval(timerMistakes); 
                resultCalc();  
            } 
        }               
    }, 100);
}


// droplet acceleration
function dropletAcceleration() {
    dropTime -= 1000;
}


//expression settings 
function expressionSettingsOne() {
    limitsOne.forEach(elem => {
        elem.addEventListener('click', () => {
            limitOperandOne = elem.value;
        });       
    }); 
    return expressionСomplexity(limitOperandOne);            
} 

function expressionSettingsTwo() {
    limitsTwo.forEach(elem => {
        elem.addEventListener('click', () => {
            limitOperandTwo = elem.value;
        });       
    }); 
    return expressionСomplexity(limitOperandTwo);             
} 

function expressionSettingsOperator() {
    arrayChecked = [];
    arithmeticOperations.forEach(elem => {
        if(elem.checked) {
           arrayChecked.push(elem.value); 
        }     
    }); 
    return arrayChecked[randomGenerator(arrayChecked.length)];            
} 


//generating expressions
function expressionGenerator() {
    operandOne =  expressionSettingsOne();
    operator = expressionSettingsOperator();
    operandTwo = expressionSettingsTwo(); 
    switch(operator) {
        case '+':
            expressionResult  = operandOne + operandTwo;
            arrayResult.push(expressionResult);
            break;

        case '-':
            if(operandOne < operandTwo) {
                expressionGenerator();
            } else {
                expressionResult  = operandOne - operandTwo;
                arrayResult.push(expressionResult);
            }
            break;

        case '*':
            expressionResult  = operandOne * operandTwo;
            arrayResult.push(expressionResult);
            break;

        case '/':   
            const division = function() {
                expressionResult  = operandOne / operandTwo;
                if(String(expressionResult).indexOf('.') !== -1) {
                    if(operandOne / operandTwo > 2) {
                        operandTwo--;
                    } else {
                        operandTwo = expressionSettingsTwo();  
                    }
                    division();
                } else {
                    expressionResult  = operandOne / operandTwo;
                    arrayResult.push(expressionResult);
                }
            }
            division();
            break;
    }
    return `${operandOne}<br><span>${operator}</span><br>${operandTwo}`;   
}


//expression complexity  
function expressionСomplexity(e) {
    if(e === '100') {
        return randomGenerator(Math.floor(e/indexTenOneHundred)) + 1;
    } else if(e === '10') {
        return randomGenerator(Math.floor(e/indexTen)) + 1;
    } else {
       return randomGenerator(e) + 1;  
    }   
}


//pressing buttons and displaying
function pressingButtons() {  
    document.addEventListener('keydown' , (e) => {
        if (scoreboard.value === '0' && e.keyCode < 58 && e.keyCode > 47) {
            scoreboard.value = e.key;
        } else if(e.keyCode < 58 && e.keyCode > 47) {
            scoreboard.value += e.key;
        } else {
            checkButtons(e.keyCode);
        }
    });

    buttons.forEach(elem => {
        elem.addEventListener('click', () => {
            if (scoreboard.value === '0' && elem.innerText !== '\u21BB' && elem.innerText !== '\u21B5' && elem.innerText !== '\u2190') {
                scoreboard.value = elem.innerText;
            } else if(elem.innerText === '\u21BB' || elem.innerText === '\u21B5' || elem.innerText === '\u2190') { 
                checkButtons(elem.innerText);
            } else {
                scoreboard.value += elem.innerText;
            }
            elem.blur();
        });
    });      
}


//check buttons enter, delete
function checkButtons(elem) {
    switch(elem) {
        case 46:
            scoreboard.value = '0';
        break;
        
        case 13:
            checkButtonEnter();           
        break;  

        case 8:
            scoreboard.value = scoreboard.value.split('').splice(0, scoreboard.value.length - 1).join('');
        break;
 
        case '\u21BB':
            scoreboard.value = '0';
        break;
        
        case '\u21B5':
            checkButtonEnter();
        break;

        case '\u2190':
            scoreboard.value = scoreboard.value.split('').splice(0, scoreboard.value.length - 1).join('');
        break;
    }    
}


//check button enter
function checkButtonEnter() {
    if(+scoreboard.value === +arrayResult[0]) {         
        if(arrayNewRainDrop[0].style.value === true) {
            dropletAcceleration();           
            document.querySelectorAll('.rain-drop').forEach(element => {
                element.classList.add('small-drop');
            }); 
            arrayResult = [];
            arrayValueDrop = [];
            arrayTimeStartDrop = [];
            arrayNewRainDrop = [];
            clearInterval(timerMistakes);
            const soundClear = new Audio();
            soundClear.preload = 'auto';
            soundClear.src = './raindrops/sound/79ddae5b075d62053434.mp3';
            soundClear.play();
        } else {
            const soundCorrect = new Audio();
            soundCorrect.preload = 'auto';
            soundCorrect.src = './raindrops/sound/ffc89ff250028f8.mp3';
            soundCorrect.play();
            arrayNewRainDrop.shift();
            arrayTimeStartDrop.shift();
            arrayResult.shift();
            clearInterval(timerMistakes);
            reduceRaindrop(); 
        }         
        
        if(arrayTimeStartDrop.length > 0) {
            start = arrayTimeStartDrop[0];
            checkRainDrops(); 
        } else {
            if(mistakes < 3) {
                clearInterval(timeCreateRainDrop);
                startRaining();   
            } else {
                clearInterval(timerMistakes);
                clearInterval(timeCreateRainDrop);
            }
        }       
        correctAnswers++;
        scoreboard.value = '0';
        success = true;
        calculateScore();
     
    } else {
        const soundMistake = new Audio();
        soundMistake.preload = 'auto';
        soundMistake.src = './raindrops/sound/cab55714b513aa7.mp3';
        soundMistake.play();
        scoreboard.classList.add('mistake');  
        setTimeout(() => scoreboard.classList.remove('mistake'), 100);
    } 
}


//reduces the resolved drop
function reduceRaindrop() {
    document.querySelectorAll('.rain-drop').forEach(elem => {
        if(+elem.getAttribute('value') === +arrayValueDrop[0]) {
            arrayValueDrop.shift();
            elem.classList.add('small-drop');
        }
    });     
}


//score to screen
function scoreToScreen() {
    scoreScreen.innerText = `Score: ${score}`;
}


//calculate score
function calculateScore() { 
    if(success) {   
        score += numberOfPoints++;
    } else {
        score -= numberOfPoints;
    } 
    scoreToScreen();
}


// full to screen
function fullToScreen() {
    fullScreen.addEventListener('click', () => {
        wrapper.classList.toggle('switch-full');
    }); 
}


//button how to play
function howToPlay() {
    buttonHowToPlay.addEventListener('click', () => {
        startButtons.classList.add('hidden');
        startRaining();
        soundFal.volume = 0.1;

        newRainDrop.classList.add('how-to-play-rain-drop');

        setTimeout(() => {
            waterLevel.classList.add('how-to-play-water-level');
        }, 3000);
        
        setTimeout(() => {
            waterLevel.classList.remove('how-to-play-water-level'); 
            scoreScreen.classList.add('how-to-play-score', 'border-red'); 
        }, 5500);
        
        setTimeout(() => {
            document.querySelectorAll('.rain-drop').forEach(element => {
                element.classList.remove('how-to-play-rain-drop');
            }); 
            scoreScreen.classList.remove('how-to-play-score', 'border-red');
            calculation.classList.add('how-to-play-calculation', 'border-red');  
        }, 8000);

        setTimeout(() => {
            calculation.classList.remove('how-to-play-calculation', 'border-red');
            settings.classList.add('how-to-play-settings');
        }, 10500);

        setTimeout(() => {
            settings.classList.remove('how-to-play-settings');
            changeTopicButton.classList.add('how-to-play-change-topic');
            setInterval(() => {
                pseudoSolutionInput();     
            }, 2000); 
        }, 13000);
        
        setTimeout(() => {
            changeTopicButton.classList.remove('how-to-play-change-topic');
            background.classList.add('good-game');
        }, 20000);

        setTimeout(() => {
            window.location.reload();
        }, 25000);
    });
}


//pseudo solution input
function pseudoSolutionInput() {
    buttons.forEach(elem => {
        if(+elem.innerText === arrayResult[0]) {
            elem.classList.add('active-button');
            elem.click();
        }
        setTimeout(() => {
            elem.classList.remove('active-button')
            if(elem.innerText === '↵') {
                elem.classList.add('active-button');
                elem.click();
                setTimeout(() => elem.classList.remove('active-button'), 300);
            }
        }, 300);                
    });
}


//result calculate and see
function resultCalc() {
    result.style.display = 'block';
    complexity.innerHTML = `Complexity level: ${limitOperandOne} ${arrayChecked.join(' ')} ${limitOperandTwo}`;
    scoreResult.innerHTML = `Score: ${score}`;
    right.innerHTML = `Right answers: ${correctAnswers}`;
    resetGame.addEventListener('click', () => {
        window.location.reload();
    });
}


//change topic and background sound 
function changeTopic() {
    changeTopicButton.addEventListener('click', () => {  
        changeTopicButton.blur(); 
        gameField.classList.toggle('change-topic-game-field');
        if(backgroundSound.getAttribute('src') === './raindrops/sound/97b952864e07e27.mp3') {
            backgroundSound.setAttribute('src', './raindrops/sound/kevin-macleod-pixelland.mp3');
            
        } else {
            backgroundSound.setAttribute('src', './raindrops/sound/97b952864e07e27.mp3');
        }   
    }); 
}


//start
startToGame();
howToPlay();

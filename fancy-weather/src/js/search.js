const searchInputField = document.querySelector('.search-input-field');
const searchButtonAudio = document.querySelector('.search-button-audio');
const searchButton = document.querySelector('.search-button');

const scriptLocation = require('./location-information');
const scriptSettings = require('./settings');



//city ​​search by clicking on the search button
function searchCity() {
    searchButton.addEventListener('click', () => {
        requestChangeCity();
    });
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            requestChangeCity();
            searchButton.blur();
        }
    });
}


//city ​​search by clicking on the audio search button
function searchAudioCity() {
    searchButtonAudio.addEventListener('click', () => {
        const SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        SpeechRecognition.lang = `${localStorage.language || 'en'}-RU`;
          SpeechRecognition.onresult = function(event) {
            searchInputField.value = event.results[0][0].transcript;
            requestChangeCity();
          }; 
        SpeechRecognition.start();
    });
}


//request to find a city and change the background
function requestChangeCity() {
    localStorage.refreshingMap = true; 
    searchButtonAnimation();
    localStorage.city = searchInputField.value;
    scriptLocation.getGeocoding();
    scriptSettings.backgroundChangeRequest();
}


//search button animation
function searchButtonAnimation() {
    searchButton.classList.add('search-button-animation');
    setTimeout(() => {
        searchButton.classList.remove('search-button-animation');
    }, 2000);
}


searchCity();
searchAudioCity();

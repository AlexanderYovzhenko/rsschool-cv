import '../styles/scss/style.scss';
import '../js/settings';
import '../js/location-information';
import '../js/search';
import '../js/weather-information';
import '../js/warning-window';

const scriptSettings = require('./settings');
const scriptLocation = require('./location-information');
const scriptWeatherInformation = require('./weather-information');

window.onload = function startSettings() {
    localStorage.refreshingMap = true;  
    scriptSettings.changeLanguageKey();
    if(localStorage.degrees === 'true') {
        scriptSettings.buttonSelectUnits.checked = 'true';   
    }
};

//get user location
async function getGeolocation() {
    const url = 'https://ipinfo.io?token=16681db3879947';
    try {
        const data = await scriptWeatherInformation.serverRequest(url, 'Failed to load geolocation data');
        addCity(data);
    } catch (error) {
        console.log(error);
    }
}

// add city in local storage
function addCity(data) {
    localStorage.city = data.city || 'Минск';
    if(localStorage.city.includes("'")) {
        localStorage.city = localStorage.city.split('').filter(letter => letter !== "'").join('');
        scriptLocation.getGeocoding();
    } else {
        scriptLocation.getGeocoding();
    }
}

getGeolocation();

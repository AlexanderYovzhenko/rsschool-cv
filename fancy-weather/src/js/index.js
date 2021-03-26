import '../styles/scss/style.scss';
import '../js/settings';
import '../js/location-information';
import '../js/search';
import '../js/weather-information';
import '../js/warning-window';


const scriptSettings = require('./settings');
const scriptLocation = require('./location-information');



window.onload = function startSettings() {
    localStorage.refreshingMap = true;  
    if(localStorage.degrees === 'true') {
        scriptSettings.buttonSelectUnits.checked = 'true';   
    }
};


//get user location
async function getGeolocation() {
    const url = 'https://ipinfo.io?token=16681db3879947';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log('Failed to load geolocation data');
        }
        const data = await response.json();
        addCity(data);
    } catch (error) {
        console.log(error);
    }
}


// add city in local storage
function addCity(data) {
    let correctCity = [];
    localStorage.city = data.city || 'Минск';
    if(localStorage.city.split('').includes("'")) {
        localStorage.city.split('').forEach(element => {
            if(element !== "'") {
                correctCity.push(element);
            } 
        });
        localStorage.city = correctCity.join('');
        scriptLocation.getGeocoding();
    }
    scriptLocation.getGeocoding();
}


getGeolocation();

const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');

const city = document.querySelector('.city');
const country = document.querySelector('.country');

const warningWindow = document.querySelector('.warning-window');
const scriptWeatherInformation = require('./weather-information');

const coordinateLanguages = {
    latitude: ['Шырата', 'Широта', 'Latitude'],
    longitude: ['Даўгата', 'Долгота', 'Longitude']
};

//coordinates on the map
function coordinatesMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGFuZHJ5b3Z6aGVua28iLCJhIjoiY2ttZXhrZWNwMnpsNTJ4a25yZnV2NG91ZCJ9.jzTFii5qzTMv_5zNt6DpyA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: localStorage.coordinates.split(','),
        zoom: 9   
    });
}

//get city and country
async function getGeocoding() {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${localStorage.city}&key=3383e762dc7440eca1181ddf9bea1f4a&pretty=1&no_annotations=1&language=${localStorage.language || 'en'}`;
    try {
        const data = await scriptWeatherInformation.serverRequest(url, 'Failed to load geocoding data');
        localStorage.country = data.results[0].components.country_code;
        displayCityCountryCorrectLanguage(data);
        scriptWeatherInformation.getLinkToWeather(displayCoordinatesLocations, coordinatesMap);
    } catch (error) {
        console.log(error);
        warningWindow.style.display = 'block';
    }
}

//display city and country in correct language
function displayCityCountryCorrectLanguage(data) {
    city.innerHTML = `${data.results[0].components.city || data.results[0].components.town || data.results[0].components.village}, `;
    country.innerHTML = data.results[0].components.country; 
}

//display coordinates locations
function displayCoordinatesLocations (data) {  
    latitude.innerHTML = `${coordinateLanguages.latitude[localStorage.keys || 2]}: ${coordinatesLocations(data.lat.split('')).join('')}`;               
    longitude.innerHTML = `${coordinateLanguages.longitude[localStorage.keys || 2]}: ${coordinatesLocations(data.lon.split('')).join('')}`;                   
}

//location of coordinates in correct format
function coordinatesLocations(dataCoordinates) {
    let coordinatesArray = [];
    let index = 0;
    let minutesIndex = 0;
    if(dataCoordinates.includes("-")) {
        coordinatesArray.push('-');
        index++;
    }
    for(let i = index; i <= dataCoordinates.length; i++) {
        if(dataCoordinates[i] === '.') { 
            minutesIndex = 0;  
            coordinatesArray.push('° ');
            continue;
        } 
        if(minutesIndex === 2 && coordinatesArray.includes('° ')) {
            coordinatesArray.push("' ");
        }
        if(i === dataCoordinates.length && coordinatesArray.includes("' ")) {
            coordinatesArray.push('"');
        } else if(i === dataCoordinates.length && !coordinatesArray.includes("' ")) { 
            coordinatesArray.push("'");
        }
        coordinatesArray.push(dataCoordinates[i]);
        minutesIndex++;
    }
    return coordinatesArray;
}

module.exports = {
    coordinatesMap: coordinatesMap,
    displayCoordinatesLocations: displayCoordinatesLocations,
    getGeocoding: getGeocoding
};

const iconWeather = document.querySelector('.icon-weather-img');
const temperatureNow = document.querySelector('.temperature-now-number');
const dateLocation = document.querySelector('.date-location');
const timeLocation = document.querySelector('.time-location');

const weatherDescription = document.querySelector('.weather-description');
const apparentTemperature = document.querySelector('.apparent-temperature');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');

const nameToday = document.querySelector('.name-today');
const temperatureToday = document.querySelector('.temperature-today');
const iconToday = document.querySelector('.icon-today');

const nameTomorrow = document.querySelector('.name-tomorrow');
const temperatureTomorrow = document.querySelector('.temperature-tomorrow');
const iconTomorrow = document.querySelector('.icon-tomorrow');

const nameDayAfterTomorrow = document.querySelector('.name-day-after-tomorrow');
const temperatureDayAfterTomorrow = document.querySelector('.temperature-day-after-tomorrow');
const iconDayAfterTomorrow = document.querySelector('.icon-day-after-tomorrow');
const warningWindow = document.querySelector('.warning-window');
const warningWindowText = document.querySelector('.warning-window-text');


const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const daysBe = ['Няд', 'Пан', 'Аўт', 'Сер', 'Чац', 'Пят', 'Суб'];
const daysEnFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysRuFull =['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const daysBeFull =['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
const monthsBe = ['Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня', 'Ліпеня', 'Жніўня', 'Верасня', 'Кастрычнiка', 'Лiстапада', 'Снежня'];


let clockInterval;   
let data = {};


//request for weather data
async function getLinkToWeather(displayCoordinatesLocations, coordinatesMap) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${localStorage.city}&days=3&units=M&lang=${localStorage.language}&key=18ace2af9e38432782b6dcd6c961ee59`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            console.log('Failed to load weather data');
        }
        data = await response.json();
        updateWeatherInformation();
        updateWeatherInformationThreeDay();
        clearInterval(clockInterval);
        displayDate(data);
        localStorage.coordinates = [data.lon, data.lat];
        displayCoordinatesLocations(data);
        if(localStorage.refreshingMap === 'true') coordinatesMap(); 
        localStorage.refreshingMap = false;           
    } catch (error) {
        console.log(error);
        displaysWarningWindow();
    }     
}


//update weather information
function updateWeatherInformation() {
    temperatureNow.innerText = `${changeDegrees(Math.round(data.data[0].temp))}`;

    iconWeather.setAttribute('src', `../src/img/icons/animated icon/${data.data[0].weather.icon}.svg`);

    weatherDescription.innerText = `${data.data[0].weather.description.toUpperCase()}`;

    const appTemp = (data.data[0].app_max_temp + data.data[0].app_min_temp)/2;
    apparentTemperature.innerText = localStorage.language === 'be' ? `АДЧУВАЕЦЦА ЯК: ${changeDegrees(Math.round(appTemp))}°` :
                                    localStorage.language === 'ru' ? `ОЩУЩАЕТСЯ КАК: ${changeDegrees(Math.round(appTemp))}°` :
                                                                     `FEELS LIKE: ${changeDegrees(Math.round(appTemp))}°`;
    
    windSpeed.innerText = localStorage.language === 'be' ? `ВЕЦЯР: ${Math.round(data.data[0].wind_spd)}m/s` :
                          localStorage.language === 'ru' ? `ВЕТЕР: ${Math.round(data.data[0].wind_spd)}m/s` :
                                                           `WIND: ${Math.round(data.data[0].wind_spd)}m/s`;
    
    humidity.innerText = localStorage.language === 'be' ? `Вільготнасць: ${Math.round(data.data[0].rh)}%` :
                         localStorage.language === 'ru' ? `ВЛАЖНОСТЬ: ${Math.round(data.data[0].rh)}%` :
                                                          `HUMIDITY: ${Math.round(data.data[0].rh)}%`;

    changeLanguageWarningWindow();
}


//update weather information in three days
function updateWeatherInformationThreeDay() {
    temperatureToday.innerText = `${changeDegrees(Math.round(data.data[0].temp))}`;
    temperatureTomorrow.innerText = `${changeDegrees(Math.round(data.data[1].temp))}`;
    temperatureDayAfterTomorrow.innerText = `${changeDegrees(Math.round(data.data[2].temp))}`;

    changeLanguageDayName(nameToday, 0);
    changeLanguageDayName(nameTomorrow, 1);
    changeLanguageDayName(nameDayAfterTomorrow, 2);

    iconToday.setAttribute('src', `../src/img/icons/animated icon/${data.data[0].weather.icon}.svg`);
    iconTomorrow.setAttribute('src', `../src/img/icons/animated icon/${data.data[1].weather.icon}.svg`);
    iconDayAfterTomorrow.setAttribute('src', `../src/img/icons/animated icon/${data.data[2].weather.icon}.svg`);
}


//change the language of the day name
function changeLanguageDayName(nameDay, index) {
    nameDay.innerHTML = localStorage.language === 'be' ? daysBeFull[new Date(data.data[index].datetime).getDay()] :
                        localStorage.language === 'ru' ? daysRuFull[new Date(data.data[index].datetime).getDay()] :
                                                         daysEnFull[new Date(data.data[index].datetime).getDay()];
}


//change the format of degrees
function changeDegrees(degrees) {  
    if(localStorage.degrees === 'true') {
        return Math.round((degrees * 9/5) + 32);
    } else {
        return degrees;
    }
}



let dateCities;
let timer;
// display the date
function displayDate() {   
    const dateTimeLocations = new Date().toLocaleString(`en-US`, {timeZone: data.timezone});  
    dateCities = new Date(dateTimeLocations);
    changeDateLanguage();
    timer = dateCities.getTime();
    clockInterval = setInterval(() => {displayClock();}, 1000);
}


//display to clock
function displayClock() {
    const timeCities = new Date(timer += 1000);
    let hours = (timeCities.getHours() < 10) ? '0' + timeCities.getHours() : timeCities.getHours(),
    minutes = (timeCities.getMinutes() < 10) ? '0' + timeCities.getMinutes() : timeCities.getMinutes(),
    seconds = (timeCities.getSeconds() < 10) ? '0' + timeCities.getSeconds() : timeCities.getSeconds();
    timeLocation.innerText = `${hours}:${minutes}:${seconds}`;
}


//change the date language
function changeDateLanguage() {
    dateLocation.innerText = localStorage.language === 'be' ? `${daysBe[dateCities.getDay()]}  ${dateCities.getDate()}  ${monthsBe[dateCities.getMonth()]}` :
                             localStorage.language === 'ru' ? `${daysRu[dateCities.getDay()]}  ${dateCities.getDate()}  ${monthsRu[dateCities.getMonth()]}` :
                                                              `${daysEn[dateCities.getDay()]}  ${dateCities.getDate()}  ${monthsEn[dateCities.getMonth()]}`;
}


//displays a warning window
function displaysWarningWindow() {
    warningWindow.style.display = 'block';
}


//change the language of the warning window
function changeLanguageWarningWindow() {
    warningWindowText.innerText = localStorage.language === 'be' ? `Калі ласка, увядзіце правільны запыт.` :
                                  localStorage.language === 'ru' ? `Пожалуйста, введите правильный запрос.` :
                                                                   `Please enter a valid request.`;
}


module.exports = {
    updateWeatherInformation: updateWeatherInformation,
    updateWeatherInformationThreeDay: updateWeatherInformationThreeDay,
    getLinkToWeather: getLinkToWeather,
    changeDateLanguage: changeDateLanguage,
    changeLanguageWarningWindow: changeLanguageWarningWindow
};

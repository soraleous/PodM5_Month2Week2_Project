// Code Adapted from https://www.studytonight.com/post/how-to-build-a-weather-app-using-javascript-for-complete-beginners

// OpenWeatherMap API https://openweathermap.org/api
const api = 'a7b9bfe5d44e18451e33b062ec076f9a';

// DOM elements from index.html
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('#c');
const tempF = document.querySelector('#f');
const desc = document.querySelector('#desc');
const sunriseDOM = document.querySelector('#sunrise');
const sunsetDOM = document.querySelector('#sunset');
const lastUpdatedDOM = document.querySelector('#lastUpdated');
const forecast = document.querySelector('#forecast');

// Event Listener fired when page loads
window.addEventListener('load', () => {
    let long;
    let lat;
    // Access Geolocation of the user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log('User Longitude is: ' + long);
            console.log('User Latitude is: ' + lat);
            // Call populateCurrentWeather 
            populateCurrentWeather(long, lat);
        });
    }
});

// Function that contains the method to populate the 'Current Weather' Card
function populateCurrentWeather(long, lat) {
    // Fetch data from the OpenWeatherMap Current Weather API then convert response to JSON (JSON is default from this API)
    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
    console.log(base);
    fetch(base).then((Response) => {
        return Response.json();
    })
        .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            const lastUpdate = data.dt;
            // Icon URL here
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            // Fahrenheit added for future usage
            const fahrenheit = (temp * 9) / 5 + 32;
            // Convert Epoch(Unix) Time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            const lastUpdateGMT = new Date(lastUpdate * 1000);
            // To change Date format https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
            const format1 = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };


            // Interact with DOM elements to show retrieved data
            iconImg.src = iconUrl;
            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${temp.toFixed(2)}` + '\u00B0' + 'C';
            tempF.textContent = `${fahrenheit.toFixed(2)}` + '\u00B0' + 'F';
            sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString(undefined, format1)}, ${sunriseGMT.toLocaleTimeString()}`;
            sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString(undefined, format1)}, ${sunsetGMT.toLocaleTimeString()}`;
            lastUpdatedDOM.textContent = `${lastUpdateGMT.toLocaleDateString(undefined, format1)}, ${lastUpdateGMT.toLocaleTimeString()}`
        });
}

// Function that contains the method to populate the 'Forecast Weather' Card
function populateForecastWeather(long, lat) {
    // Modify amount of days to return here
    const days = 7;
    // Fetch data from the OpenWeatherMap Daily Forecast Weather API then convert response to JSON (JSON is default from this API)
    const base =
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=${days}&appid=${api}`;
    console.log(base);
    fetch(base).then((Response) => {
        return Response.json();
    })
        .then((data) => {
            // TODO: Gather the relevant data and then assign it to the DOM elements
        });
}
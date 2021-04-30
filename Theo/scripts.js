// Code Adapted from https://www.studytonight.com/post/how-to-build-a-weather-app-using-javascript-for-complete-beginners

// OpenWeatherMap API
const api = 'a7b9bfe5d44e18451e33b062ec076f9a';

// DOM elements from index.html
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');


// Event Listener fired when page loads
window.addEventListener('load', () => {
    let long;
    let lat;
    // Access Geolocation of the user
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);
            // Fetch data from API then convert response to JSON
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
                    // Icon URL here
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    // Fahrenheit added for future usage
                    const fahrenheit = (temp * 9) / 5 + 32;
                    // Convert Epoch(Unix) Time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);


                    // Interact with DOM elements to show retrieved data
                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)}` + '\u00B0' + 'C';
                    tempF.textContent = `${fahrenheit.toFixed(2)}` + '\u00B0' + 'F';
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                });
        });
    }
});


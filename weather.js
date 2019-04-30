const weather = document.querySelector('.js-temperature'),
      coords = document.querySelector('.js-coords');

const API_KEY = '4de275e9c1dc478d273652025b925b02';
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(json => {
      const currentTemp = json.main.temp;
      const maxTemp = json.main.temp_max;
      const minTemp = json.main.temp_min;
      const windSpeed = json.wind.speed;
      const place = json.name;
      weather.innerText = `Current Temperature : ${currentTemp}°C`;
      coords.innerText = `Current Location : ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj  = {
    latitude: latitude,
    longitude: longitude,
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('Cant access geo location')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    // get weather
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
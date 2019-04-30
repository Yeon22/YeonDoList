const temperature = document.querySelector('.temperature'),
      tempMaxMinContainer = document.querySelector('.temperature-max-min'),
      tempMax = tempMaxMinContainer.querySelector('.temperature-max'),
      tempMin = tempMaxMinContainer.querySelector('.temperature-min');


function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(json => {
      const currentTemp = json.main.temp;
      const maxTemp = json.main.temp_max;
      const minTemp = json.main.temp_min;
      const place = json.name;
      temperature.innerText = `${currentTemp}°C / ${place}`;
      temperature.addEventListener('click', handleClickTemperature);
      tempMax.innerText = `Max : ${maxTemp}°C`;
      tempMin.innerText = `Min : ${minTemp}°C`;
    });
}

function handleClickTemperature() {
  const isHide = tempMaxMinContainer.classList.contains(HIDE_CN);
  if (isHide) {
    tempMaxMinContainer.classList.remove(HIDE_CN);
  } else {
    tempMaxMinContainer.classList.add(HIDE_CN);
  }
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
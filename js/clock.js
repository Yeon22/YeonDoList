const clockContainer = document.querySelector('.clock'),
      clockText = clockContainer.querySelector('.clock-text');

function timeConverter(v) {
  const time = Number(v);
  return time < 10 ? `0${time}` : time;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockText.innerHTML = `${timeConverter(hours)}:${timeConverter(minutes)}:${timeConverter(seconds)}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
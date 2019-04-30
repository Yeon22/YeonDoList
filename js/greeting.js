const nameForm = document.querySelector('.name'),
      input = nameForm.querySelector('input'),
      greetingText = document.querySelector('.greeting-text');

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
  event.preventDefault(); // event의 기본 동작을 막음.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  nameForm.classList.remove(HIDE_CN);
  nameForm.addEventListener('submit', handleSubmit);
}

function paintGreeting(name) {
  nameForm.classList.remove(SHOWING_CN);
  nameForm.classList.add(HIDE_CN);
  greetingText.classList.add(SHOWING_CN);
  greetingText.innerText = `Hello, ${name}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
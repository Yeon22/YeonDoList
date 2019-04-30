const toDoContainer = document.querySelector('.js-to-do'),
      toDoInput = toDoContainer.querySelector('input'),
      toDoList = document.querySelector('.js-to-do-list'),
      deleteAllBtnContainer = document.querySelector('.delete-btn-container'),
      deleteAllBtn = document.querySelector('.js-delete-all-to-do');

const TODOS_LS = 'toDos',
      HIDE_CN = 'hide';

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(toDo => toDo.id !== Number(li.id));
  toDos = cleanToDos;
  saveToDos();
}

function deleteAllToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify([]));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const deleteBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  }
  toDos.push(toDoObj);
  saveToDos();
}

function paintDeleteAllBtn(parsedToDos) {
  if (parsedToDos.length > 0) {
    deleteAllBtnContainer.classList.remove(HIDE_CN);
    deleteAllBtnContainer.classList.add(SHOWING_CN);
    deleteAllBtn.addEventListener('click', deleteAllToDos);
  } else {
    deleteAllBtnContainer.classList.remove(SHOWING_CN);
    deleteAllBtnContainer.classList.add(HIDE_CN);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    if (parsedToDos.length > 0) {
      parsedToDos.forEach(toDo => {
        paintToDo(toDo.text);
      });
    }
    paintDeleteAllBtn(parsedToDos);
  }
}

function init() {
  loadToDos();
  toDoContainer.addEventListener('submit', handleSubmit);
}

init();
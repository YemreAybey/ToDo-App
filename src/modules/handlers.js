/* eslint-env browser */
import ToDo from './toDo';
import storage from './storage';
import { renderToDo, clearFormContent } from './render';
import { formPr, todoForm, proFa, prInp } from './dom-select';

const todoH = document.querySelector('.todoH');
const date = document.getElementById('date');
const title = document.getElementById('toDoText');
const desc = document.getElementById('desText1');
const radio = document.getElementById('inlineRadio1');
const radio2 = document.getElementById('inlineRadio2');

const saveTd = () => {
  if (title !== '' && date !== '') {
    const status = radio.checked ? 'Normal' : 'Urgent';

    const todo = new ToDo(title.value, date.value, status, desc.value);
    const pro = storage.filter(
      pro => pro.name.toUpperCase() == todoH.innerHTML.toUpperCase()
    );
    pro[0].toDos.push(todo);
    renderToDo(todo);
    localStorage.setItem('projectList', JSON.stringify(storage));
  }
  clearFormContent(title, desc, date);
  radio.checked = false;
  radio2.checked = false;
};

const closeTodo = () => {
  todoForm.classList.toggle('d-none');
};

const showTodo = () => {
  clearFormContent(title, desc, date);
  radio.checked = false;
  radio2.checked = false;
  todoForm.classList.toggle('d-none');
};

const addPj = () => {
  formPr.classList.toggle('d-none');
  proFa.classList.toggle('fa-plus');
  proFa.classList.toggle('fa-minus');
  clearFormContent(prInp);
};

export { showTodo, closeTodo, saveTd, addPj };

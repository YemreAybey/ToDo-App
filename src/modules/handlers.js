/* eslint-env browser */
import ToDo from './toDo';
import storage from './storage';
import { renderToDo, createProject } from './render';
import { formPr, todoForm, proFa } from './dom-select';

function saveTd() {
  const todoH = document.querySelector('.todoH');
  const date = document.getElementById('date').value;
  const title = document.getElementById('toDoText').value;
  const desc = document.getElementById('desText1').value;
  if (title !== '' && date !== '') {
    const status = document.getElementById('inlineRadio1').checked
      ? 'Normal'
      : 'Urgent';
    const todo = new ToDo(title, date, status, desc);
    const pro = storage.filter(
      pro => pro.name.toUpperCase() == todoH.innerHTML.toUpperCase()
    );
    pro[0].toDos.push(todo);
    renderToDo(todo);
    localStorage.setItem('projectList', JSON.stringify(storage));
  }
}

function closeTodo() {
  todoForm.classList.toggle('d-none');
}

function showTodo() {
  todoForm.classList.toggle('d-none');
}

function addPj() {
  formPr.classList.toggle('d-none');
  proFa.classList.toggle('fa-plus');
  proFa.classList.toggle('fa-minus');
}

export { showTodo, closeTodo, saveTd, addPj };

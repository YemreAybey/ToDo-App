/* eslint-env browser */
import storage from './modules/storage';
import { renderPro, renderToDo, createProject } from './modules/render';
import {
  addPro,
  showTodoForm,
  saveTodo,
  closeTodoForm,
  prSub
} from './modules/dom-select';
import { showTodo, closeTodo, saveTd, addPj } from './modules/handlers';

showTodoForm.addEventListener('click', showTodo);
closeTodoForm.addEventListener('click', closeTodo);
saveTodo.addEventListener('click', saveTd);
addPro.addEventListener('click', addPj);
prSub.addEventListener('click', createProject);

storage.forEach(pro => renderPro(pro));
storage[0].toDos.forEach(todo => renderToDo(todo));

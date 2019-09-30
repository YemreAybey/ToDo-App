/* eslint-env browser */
import { format } from 'date-fns';
import _ from 'lodash';
import parseISO from 'date-fns/parseISO';
import storage from './storage';
import { prArea, formPr, todoH, addF, updtButton, proFa } from './dom-select';
import Project from './project';

const contentChange = (tag, head, pro, addF) => {
  tag.addEventListener('click', () => {
    changeHeader(head, pro);
    const items = findTodos();
    clearContent(items);
    pro.toDos.forEach(todo => renderToDo(todo));
    addF.classList.remove('d-none');
  });
}

const removeProject = (tag, pro, todoH, addF) => {
  tag.addEventListener('click', e => {
    _.remove(storage, n => n == pro);
    localStorage.setItem('projectList', JSON.stringify(storage));
    e.target.parentNode.parentNode.remove();
    const items = findTodos();
    clearContent(items);
    todoH.innerHTML = '';
    addF.classList.toggle('d-none');
  });
}

const changeHeader = (tag, pro) => {
  tag.innerHTML = pro.name.toUpperCase();
}

const clearContent = (items) => {
  items.forEach(item => item.remove());
}

const findTodos = () => {
  const items = document.querySelectorAll('.todo-item');
  return items;
}

const renderToDo = (todo) => {
  const div = document.createElement('div');
  div.classList.add(
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'text-light',
    'border-bottom',
    'border-secondary',
    'mb-2',
    'mt-2',
    'todo-item',
    'text-center'
  );
  const mdlBtn = document.createElement('button');
  mdlBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'mb-2');
  mdlBtn.dataset.toggle = 'modal';
  mdlBtn.dataset.target = '#mymodal';
  mdlBtn.innerHTML = 'Change';
  mdlBtn.addEventListener('click', e => {
    const todoName = e.target.nextSibling.nextSibling.innerHTML;
    const thePro = storage.filter(p =>
      p.toDos.some(t => t.title == todoName)
    )[0];
    const theTodo = thePro.toDos.filter(t => t.title == todoName)[0];
    const upText = document.getElementById('uptText');
    upText.value = theTodo.title;
    console.log(theTodo.title);
    const radio1 = document.getElementById('inlineRadio4');
    const radio2 = document.getElementById('inlineRadio3');
    if (theTodo.status.toLowerCase() == 'urgent') {
      radio1.checked = true;
    } else {
      radio2.checked = true;
    }
    const theDate = document.getElementById('uptDate');
    theDate.value = theTodo.date;
    updtButton.addEventListener('click', () => {
      theTodo.title = upText.value;
      theTodo.date =
        theDate.value == '' ? format(new Date(), 'yyyy-MM-dd') : theDate.value;
      theTodo.status = radio1.checked ? 'Urgent' : 'Normal';
      const items = document.querySelectorAll('.todo-item');
      items.forEach(item => item.remove());
      thePro.toDos.forEach(todo => renderToDo(todo));
      localStorage.setItem('projectList', JSON.stringify(storage));
    });
  });

  const span = document.createElement('span');
  const span2 = document.createElement('span');
  span2.classList.add('px-2', 'w-50', 'ml-2');
  span2.innerHTML = todo.title;

  const itag = document.createElement('i');
  if (todo.isDone) {
    itag.classList.add('fas', 'fa-check-circle', 'ml-2', 'text-success');
    span2.classList.add('line-through');
  } else {
    itag.classList.add('far', 'fa-circle', 'ml-2'); // fas fa-check-circle
  }

  itag.addEventListener('click', e => {
    e.target.classList.toggle('far');
    e.target.classList.toggle('fa-circle');
    e.target.classList.toggle('fas');
    e.target.classList.toggle('fa-check-circle');
    e.target.classList.toggle('text-success');
    span2.classList.toggle('line-through');
    todo.isDone = todo.isDone == true ? false : true;
    localStorage.setItem('projectList', JSON.stringify(storage));
  });
  span.appendChild(itag);
  const span3 = document.createElement('span');
  span3.classList.add('pr-2');
  span3.innerHTML = format(parseISO(todo.date), 'PP');
  const span4 = document.createElement('span');
  span4.innerHTML = todo.status;

  const span5 = document.createElement('span');
  span5.classList.add('text-secondary');
  const iTag = document.createElement('i');
  iTag.classList.add('far', 'fa-trash-alt', 'delTodo');
  span5.appendChild(iTag);
  iTag.addEventListener('click', () => {
    div.remove();
    const pro = storage.filter(pr => pr.toDos.includes(todo))[0];
    _.remove(pro.toDos, t => t == todo);
    localStorage.setItem('projectList', JSON.stringify(storage));
  });
  div.appendChild(mdlBtn);
  div.appendChild(span);
  div.appendChild(span2);
  div.appendChild(span3);
  div.appendChild(span4);
  div.appendChild(span5);
  const area = document.querySelector('.tasks');
  area.appendChild(div);
}
const renderPro = (pro) => {
  const div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  const span = document.createElement('span');
  span.classList.add('text-secondary');
  const iTag = document.createElement('i');
  iTag.classList.add('far', 'fa-trash-alt');
  span.appendChild(iTag);
  let h5tag = document.createElement('h5');
  h5tag.innerHTML = pro.name;
  h5tag.classList.add('text-info');
  contentChange(h5tag, todoH, pro, addF);
  removeProject(iTag, pro, todoH, addF);
  div.appendChild(h5tag);
  div.appendChild(span);
  prArea.appendChild(div);
}

const createProject = () => {
  const prInput = document.querySelector('.prInput');
  if (prInput.value === '') {
    alert('please fill the form');
  } else {
    const pro = new Project(prInput.value);
    storage.push(pro);
    localStorage.setItem('projectList', JSON.stringify(storage));
    formPr.classList.toggle('d-none');
    proFa.classList.toggle('fa-plus');
    proFa.classList.toggle('fa-minus');
    renderPro(pro);
  }
}

export { renderPro, renderToDo, createProject };

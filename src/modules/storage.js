import Project from './project';
import ToDo from './toDo';
import { format } from 'date-fns';
​
const welcome = new Project('Welcome');
const firstTask = new ToDo(
  'Create Task',
  format(new Date(), 'yyyy-MM-dd'),
  'Normal'
);
welcome.addToDo(firstTask);
let storage = localStorage.getItem('projectList')
  ? JSON.parse(localStorage.getItem('projectList'))
  : [welcome];
​
localStorage.setItem('projectList', JSON.stringify(storage));
​
export default storage;

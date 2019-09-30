class Project {
  constructor(name) {
    this.name = name;
    this.toDos = [];
  }
  addToDo(todo) {
    this.toDos.push(todo);
  }
}

export default Project;

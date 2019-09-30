class ToDo {
  constructor(title, date, status, descr = 'Dont Forget', isDone) {
    this.title = title;
    this.date = date;
    this.status = status;
    this.descr = descr;
    this.isDone = false;
  }
}

export default ToDo;

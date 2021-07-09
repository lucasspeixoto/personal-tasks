export class Task {
  id: string;
  task: string;
  time: string;
  category: string;
  status: string;

  constructor(
    id: string = "",
    task: string = "",
    time: string = "",
    category: string = "",
    status: string = ""
  ) {
    this.id = id;
    this.task = task;
    this.time = time;
    this.category = category;
    this.status = status
  }
}

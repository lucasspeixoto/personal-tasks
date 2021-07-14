/* export class Task {
  id: string;
  task: string;
  time: string;
  category: string;
  status: string;
  userid: string;

  constructor(
    id: string = "",
    task: string = "",
    time: string = "",
    category: string = "",
    status: string = "",
    userid: string = ""
  ) {
    this.id = id;
    this.task = task;
    this.time = time;
    this.category = category;
    this.status = status;
    this.userid = userid
  }
}
 */
export interface Task {
  id: string;
  task: string;
  time: string;
  description: string;
  category: string;
  status: string;
  userid: string;
}

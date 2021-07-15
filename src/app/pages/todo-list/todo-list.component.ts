import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParametersService } from 'src/app/shared/services/parameters.service';
import { UserService } from 'src/app/shared/services/user.service';
import { TaskService } from './../../shared/services/tasks.service';
import { Summary, Detail } from './../../shared/static/messages';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { Cols } from './../../shared/static/cols';
import { Task } from './../../shared/static/task';
import { ProviderUser } from './../../shared/static/user';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  providerUserData: ProviderUser

  cols: Array<Cols>

  tasks: Task[]

  isError: boolean = false
  showDetail: boolean = true

  taskObservableControl$ = new Subject()

  @ViewChild(TaskManagerComponent) TaskModalManager

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    public authService: AuthService,
    public userService: UserService,
    public parametersService: ParametersService
  ) {
    this.providerUserData = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit() {
    this.getTasksInfo()
    this.setTable()
  }

  ngOnDestroy() {
    this.taskObservableControl$.next()
    this.taskObservableControl$.complete()
  }

  // Função para obter tarefas do banco
  getTasksInfo() {
    this.taskService
      .getAll()
      .valueChanges()
      .pipe(
        takeUntil(this.taskObservableControl$),
        map((obj) =>
          obj.filter((obj) => obj['userid'] === this.providerUserData.uid)
        )
      )
      .subscribe(
        (task: Array<Task>) => {
          if (task === undefined) {
            this.tasks = []
          } else {
            this.tasks = task
            this.isError = false
          }
        },
        (error) => {
          this.isError = true;
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Summary[error.code],
            detail: Detail[error.code],
          });
        }
      );
  }

  // Função que define os parâmetros para a criação da tabela
  setTable() {
    this.cols = [
      { field: 'task', header: 'Tarefa', width: '30%', align: 'left' },
      { field: 'time', header: 'Horário', width: '12%', align: 'left' },
      { field: 'category', header: 'Categoria', width: '15%', align: 'left' },
      { field: 'status', header: 'Situação', width: '15%', align: 'left' },
    ];
  }

  getAddTask() {
    this.TaskModalManager.setFormAdd()
  }

  getDescription(event, item: Task) {
    this.TaskModalManager.setDescription(item)
  }

  getEditar(event, item: Task) {
    this.TaskModalManager.setFormEdit(item)
  }

  getExcluir(event, item: Task) {
    this.TaskModalManager.setFormRemove(item)
  }
}

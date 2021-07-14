import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParametersService } from 'src/app/shared/services/parameters.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Task } from 'src/app/shared/static/task';
import { TaskService } from './../../shared/services/tasks.service';
import { Summary, Detail } from './../../shared/static/messages';
import { TaskManagerComponent } from './task-manager/task-manager.component';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  // Tarefas
  tasks: Task[];

  // Usuário
  userData: any;
  userData2: any;

  // Colunas da tabela
  cols: any[];

  // Modelo
  itens: any[];

  // Controle
  isError: boolean;
  showDetail: boolean = true;


  //Variáves do formulários
  categories: any;

  destroy$ = new Subject();

  @ViewChild(TaskManagerComponent) componetChild;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    public authService: AuthService,
    public userService: UserService,
    public parametersService: ParametersService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getTasksInfo();
    this.setTable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Função para obter tarefas do banco
  getTasksInfo() {
    this.taskService.getAll().valueChanges()
      .pipe(
        takeUntil(this.destroy$),
        map((obj) =>
          obj.filter((obj) =>
            obj['userid'] === this.userData.uid
          )
        )
      )
      .subscribe(
        (task) => {
          if (task === undefined) {
            this.itens = [];
          } else {
            this.itens = task;
            this.isError = false;
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
    this.componetChild.setFormAdd();
  }

  getDescription(event, item: Task) {
    this.componetChild.setDescription(item);
  }

  getEditar(event, item: Task) {
    this.componetChild.setFormEdit(item);
  }

  getExcluir(event, item: Task) {
    this.componetChild.setFormRemove(item)
  }

}

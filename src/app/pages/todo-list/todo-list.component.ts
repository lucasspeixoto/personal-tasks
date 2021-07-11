import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParametersService } from 'src/app/shared/services/parameters.service';
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

  // Colunas da tabela
  cols: any[];

  // Modelo
  itens: any[];

  // Controle
  isError: boolean;
  showDetail: boolean = true;


  //Variáves do formulários
  categories: any;

  @ViewChild(TaskManagerComponent) componetChild;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    public authService: AuthService,
    public parametersService: ParametersService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getTasksInfo();
    this.setTable();
  }

  // Função para obter tarefas do banco
  getTasksInfo() {
    this.taskService
      .getAll()
      .pipe(
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
      { field: 'time', header: 'Horário', width: '20%', align: 'left' },
      { field: 'category', header: 'Categoria', width: '20%', align: 'left' },
      { field: 'status', header: 'Situação', width: '20%', align: 'left' },
      /*  { field: 'owner', header: 'Dono', width: '20%', align: 'left' }, */
    ];
  }


  getAddTask() {
    this.componetChild.setFormAdd();
  }

  getEditar(event, item: Task) {
    this.componetChild.setFormEdit(item);

  }

}

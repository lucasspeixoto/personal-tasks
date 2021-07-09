import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/productservice';
import { Product } from 'src/app/shared/static/product';
import { Task } from 'src/app/shared/static/task';
import { TaskService } from './../../shared/services/tasks.service';
import { Summary, Detail } from './../../shared/static/messages';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;


  // Tarefas
  tasks: Task[];
  // Usuário
  userData: any;
  // Colunas da tabela
  cols: any[];
  // Modelo
  itens: any[];
  // Controle de erro
  isError: boolean;

  constructor(
    private productService: ProductService,
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService

  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getTasksInfo()
    this.setTable()
  }

  // Função para obter tarefas do banco
  getTasksInfo() {
    this.taskService.getAll()
      .subscribe(
        (task) => {
          if (task === undefined) {
            this.itens = [];
          } else {
            this.itens = task;
            this.isError = false;
          }
        }, error => {
          this.isError = true;
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Summary[error.code],
            detail: Detail[error.code]
          });
        }
      );
  }

  // Função que define os parâmetros para a criação da tabela
  setTable() {
    this.cols = [
      { field: 'task', header: 'Tarefa', width: '20%', align: 'left' },
      { field: 'time', header: 'Horário', width: '10%', align: 'left' },
      { field: 'category', header: 'Categoria', width: '20%', align: 'left' },
      { field: 'status', header: 'Situação', width: '20%', align: 'left' },
     /*  { field: 'owner', header: 'Dono', width: '20%', align: 'left' }, */

    ];
  }




}

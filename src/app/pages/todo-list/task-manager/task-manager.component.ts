import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ParametersService } from 'src/app/shared/services/parameters.service';
import { TaskService } from 'src/app/shared/services/tasks.service';
import { Detail, Summary } from './../../../shared/static/messages';
import { Task } from './../../../shared/static/task';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {

  //comunicação entre componetes
  @Input() item: Array<any>;
  @Output() eventOutput = new EventEmitter();

  //formulário e elementos
  taskForm: FormGroup;
  itemId: string;
  itemNome: string;
  language: string;
  dialogTitle: string = ''
  description: string

  //booleans
  isEditar: boolean;
  displayAddEdit: boolean = false;
  displayDelete: boolean = false;
  displayDescription: boolean = false;

  //usuario
  userData: any;
  loading: boolean;

  categories: any;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public parametersService: ParametersService,
    private tasksService: TaskService,

  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.formComponent();
    this.getDropListInfos();
  }

  getDropListInfos() {
    this.parametersService.getDropListInfos()
      .subscribe(
        (resp) => {
          if (resp === undefined) {
            this.categories = [];
            this.status = []
          } else {
            this.categories = resp[0];
            this.status = resp[1]
          }
        },
        (error) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Summary[error.code],
            detail: Detail[error.code],
          });
        }
      );
  }

  formComponent() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      task: ['', [Validators.required, Validators.minLength(2)]],
      time: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      status: ['', [Validators.required, Validators.minLength(2)]],
      userid: [this.userData.uid]
    });
  }

  setFormAdd() {
    this.dialogTitle = 'Adicionar Tarefa'
    this.displayAddEdit = true;
    this.isEditar = false;
    this.taskForm.reset();
  }

  setDescription(task: Task) {
    this.dialogTitle = task.task
    this.displayDescription = true;
    this.description = task.description;
  }

  setFormEdit(task: Task) {
    this.displayAddEdit = true;
    this.taskForm.setValue(task);
    this.dialogTitle = 'Editar Tarefa'
    this.isEditar = true;
  }

  setFormRemove(task: Task) {
    this.itemId = task.id;
    this.itemNome = task.task;
    this.isEditar = false;
    this.displayDelete = true;
  }


  setTime(item) {
    let format = this.taskForm.controls.time.value;
    console.log(this.taskForm.controls.time.value)
    /* console.log(format.split('T'));
    console.log(this.taskForm.controls.time.value)
    "| date: dd/MM/yyyy, hh:mm" */
  }


  save() {
    this.loading = true;
    this.taskForm.get('userid')?.setValue(this.userData.uid)
    this.tasksService.insert(this.taskForm.value)
    this.displayAddEdit = false;
  }

  update() {
    this.loading = true;
    this.taskForm.get('userid')?.setValue(this.userData.uid)
    this.tasksService.update(this.taskForm.value)
    this.displayAddEdit = false;
  }

  delete() {
    this.loading = true;
    this.tasksService.remove(this.itemId)
    this.displayDelete = false;
  }

  cancelAddAndEdit() {
    this.displayAddEdit = false;
    this.taskForm.reset();
  }

  cancelDelete() {
    this.displayDelete = false;
  }
}

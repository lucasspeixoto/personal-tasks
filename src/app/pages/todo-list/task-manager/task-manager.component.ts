import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ParametersService } from 'src/app/shared/services/parameters.service';
import { TaskService } from 'src/app/shared/services/tasks.service';
import { Detail, Summary } from './../../../shared/static/messages';

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
  cadastroForm: FormGroup;
  itemId: string;
  itemNome: string;
  language: string;
  //booleans
  displayAdicionar: boolean;
  displayExcluir: boolean;
  isEditar: boolean;

  //usuario
  userData: any;
  isLoadingButton: boolean;

  categories: any;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public parametersService: ParametersService,
    private tasksService: TaskService,
    public authService: AuthService
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
    this.cadastroForm = this.formBuilder.group({
      id: [''],
      task: ['', [Validators.required, Validators.minLength(2)]],
      time: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      status: ['', [Validators.required, Validators.minLength(2)]],
      userid: ['']
    });
  }

  setFormAdd() {
    this.displayAdicionar = true;
    this.cadastroForm.reset();
    this.isEditar = false;
  }

  setFormEdit(item) {
    this.cadastroForm.controls.name.setValue(item.name);
    this.cadastroForm.controls.document.setValue(item.document);
    this.displayAdicionar = true;
    this.isEditar = true;
  }

  setFormRemove(item) {
    this.itemId = item.name;
    this.itemNome = item.name;
    this.isEditar = false;
    this.displayExcluir = true;
  }

  cancel() {
    this.displayAdicionar = false;
    this.cadastroForm.reset();
  }

  save() {
    this.isLoadingButton = true;
    this.cadastroForm.get('userid')?.setValue(this.userData.uid)
    this.tasksService.insert(this.cadastroForm.value)
  }


  /*
  salvar() {
    this.isLoadingButton = true;
    this.genericService.tipoUrl('checkCompany', this.cadastroForm.value);
    this.genericService.post()
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.CadastroSummary,
            detail: Mensagens.CadastroDetail
          });
          localStorage.setItem('empresaInfo', this.cadastroForm.value);
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;
          this.isLoadingButton = false;
          this.router.navigate(['cadastro/essenciais']);
        }, error => {
          this.isLoadingButton = false;
          this.messageService.clear();
          this.messageService.add({
            severity: 'warn',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
          this.cadastroForm.reset();
        }
      );
  }

  editar() {
    this.isLoadingButton = true;
    //Conversão do objeto para Base64
    let userInfoBase64 = this.commonServices.convertToBase64(this.cadastroForm.value);
    //Encriptação do obejto previamente convertido paraBase64
    let userInfoEncrip = this.cryptoService.encrypt(userInfoBase64);
    this.genericService.urlService = 'gestao_acesso/usuario/atualizar/' + userInfoEncrip;
    this.genericService.put()
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.AtualizarSummary,
            detail: Mensagens.AtualizarDetail
          });
          this.eventOutput.emit();
          this.cadastroForm.reset();
          this.displayAdicionar = false;
          this.isLoadingButton = false;
        }, error => {
          this.isLoadingButton = false;
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  excluir() {
    //Conversão do objeto para Base64
    let userInfoBase64 = this.commonServices.convertToBase64(this.itemId);
    //Encriptação do objeto previamente convertido paraBase64
    let userInfoEncrip = this.cryptoService.encrypt(userInfoBase64);
    this.genericService.urlService = 'gestao_acesso/usuario/deletar/' + userInfoEncrip;
    this.genericService.delete()
      .subscribe(
        (resp) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: Mensagens.ExcluirSummary,
            detail: Mensagens.ExcluirDetail
          });
          this.eventOutput.emit();
          this.displayExcluir = false;
        }, error => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: error.error.msg.summary,
            detail: error.error.msg.detail
          });
        }
      );
  }

  cancelarExcluir() {
    this.displayExcluir = false;
  } */
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // formulário e elementos
  loginForm: FormGroup;
  year: number;

  // Senha
  mostrarSenha: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(){
    this.loginFormMake()
    let date = new Date()
    this.year = date.getFullYear()
  }

  loginFormMake() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(3)]
    })
  }


  login() {
    alert('Login')
  }

  showPassword() {
    this.mostrarSenha = !this.mostrarSenha
  }

}

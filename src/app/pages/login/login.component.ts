import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // formulário e elementos
  loginForm: FormGroup;
  year: number;

  // Senha
  mostrarSenha: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private messageService: MessageService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginFormMake();
    let date = new Date();
    this.year = date.getFullYear();
  }

  loginFormMake() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.SignIn(email, password);
  }

  showPassword() {
    this.mostrarSenha = !this.mostrarSenha;
    console.log(this.loginForm);
  }
}

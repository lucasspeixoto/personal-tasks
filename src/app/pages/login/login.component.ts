import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
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

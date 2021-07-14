import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // formulário e elementos
  registerForm: FormGroup;
  year: number;

  // Senha
  mostrarSenha: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerFormMake()
    let date = new Date()
    this.year = date.getFullYear()
  }

  registerFormMake() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  register() {
    const { email, password, name } = this.registerForm.value
    this.authService.SignUp(email, password, name)

  }



  showPassword() {
    this.mostrarSenha = !this.mostrarSenha
    console.log(this.registerForm)
  }

}

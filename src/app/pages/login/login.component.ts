import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(){
    this.loginFormMake()
    let date = new Date()
    this.year = date.getFullYear()
  }

  loginFormMake() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }


  login() {
    const { email, password } = this.loginForm.value
    console.log(email)
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((user => {
      console.log(user.user)
      this.router.navigate([''])
    })).catch(error =>{
      alert(error)
    })
  }

  showPassword() {
    this.mostrarSenha = !this.mostrarSenha
    console.log(this.loginForm)
  }

}

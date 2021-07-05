import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
     private messageService: MessageService
   ) { }

   ngOnInit(){
     this.registerFormMake()
     let date = new Date()
     this.year = date.getFullYear()
   }

   registerFormMake() {
     this.registerForm = this.formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required],
       name: ['', Validators.required]
     })
   }


   login() {
     alert('Login')
   }

   showPassword() {
     this.mostrarSenha = !this.mostrarSenha
     console.log(this.registerForm)
   }

 }

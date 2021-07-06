import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { TodoListComponent } from 'src/app/pages/todo-list/todo-list.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { PrimeNgModule } from './primeng.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    PrimeNgModule

  ],
  providers: [AuthenticationService],
  exports: [
    LoginComponent,
    RegisterComponent,
    TodoListComponent
  ]
})
export class SharedCommonModule { }

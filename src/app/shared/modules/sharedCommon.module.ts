import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { TodoListComponent } from 'src/app/pages/todo-list/todo-list.component';
import { AuthService } from 'src/app/shared/services/auth.service';

import { PrimeNgModule } from './primeng.module';
import { TaskManagerComponent } from 'src/app/pages/todo-list/task-manager/task-manager.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../services/productservice';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    TodoListComponent,
    TaskManagerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    PrimeNgModule,

    AppRoutingModule

  ],

  exports: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    TodoListComponent,
    TaskManagerComponent,
    HeaderComponent
  ],
  providers: [
    AuthService,
    ProductService,
    MessageService,
    ConfirmationService
  ],
})
export class SharedCommonModule { }

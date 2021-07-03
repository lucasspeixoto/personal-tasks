import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { HeaderComponent } from '../components/header/header.component';
import { PrimeNgModule } from './primeng.module';

@NgModule({
    declarations: [
        LoginComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,

        PrimeNgModule

    ],
    providers: [ ],
    exports: [
        LoginComponent,
    ]
})
export class SharedCommonModule { }

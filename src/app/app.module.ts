import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './shared/modules/primeng.module';
import { SharedCommonModule } from './shared/modules/sharedCommon.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { ParametersService } from './shared/services/parameters.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Browser
    BrowserModule,
    BrowserAnimationsModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,

    // Routing
    AppRoutingModule,

    // PrimeNg
    PrimeNgModule,

    // Modules
    SharedCommonModule,
    HttpClientModule,
  ],
  providers: [AuthService, ParametersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

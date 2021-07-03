import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './shared/modules/primeng.module';
import { SharedCommonModule } from './shared/modules/sharedCommon.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    PrimeNgModule,
    SharedCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

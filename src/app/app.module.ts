import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarShowComponent } from './car-show/car-show.component';

import { HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    CarShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TituloComponent } from './titulo/titulo.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { HistorialComponent } from './historial/historial.component';
import {ApiInterceptor} from "./api.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TituloComponent,
    RegistroComponent,
    HomeComponent,
    ListadoComponent,
    ConfirmacionComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

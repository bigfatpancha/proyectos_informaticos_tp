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
import { HttpClientModule }    from '@angular/common/http';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { HistorialComponent } from './historial/historial.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ListadoMedicosComponent } from './listado-medicos/listado-medicos.component';
import { RegistroMedicoComponent } from './registro-medico/registro-medico.component';
import { ListadoEspecialidadesComponent } from './listado-especialidades/listado-especialidades.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TituloComponent,
    RegistroComponent,
    HomeComponent,
    ListadoComponent,
    ConfirmacionComponent,
    HistorialComponent,
    HomeAdminComponent,
    ListadoMedicosComponent,
    RegistroMedicoComponent,
    ListadoEspecialidadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

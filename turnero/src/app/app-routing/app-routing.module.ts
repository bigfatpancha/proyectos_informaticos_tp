import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component'
import { RegistroComponent } from '../registro/registro.component'
import { HomeComponent } from '../home/home.component'
import { ListadoComponent } from '../listado/listado.component'
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component'

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home/buscar', component: ListadoComponent },
  { path: 'confirmacion', component: ConfirmacionComponent }

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
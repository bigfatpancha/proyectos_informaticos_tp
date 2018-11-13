import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import {Medico, Especialidad, PersonalData} from '../model/model'
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public errorMessage:string = '';
  private requiredFields:string[] = ['especialidad', 'medico'];

	listado: any = {
		mostrar: false
	};

  medicos: Array<Medico> = [];
  especialidades: Array<Especialidad> = [];
  selectedEspecialidad: string;
  busqueda: any = {
    especialidad: "",
    medico: "",
    fecha: ""
  };
  fechaPlaceHolder = "";

  personalData: PersonalData;

  constructor(
    private _hs: HttpService,
    private _sessionService: SessionService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.personalData = this._sessionService.getPersonalData();
    if (!this.personalData){
      this._router.navigateByUrl('/login');
    }
    this._hs.getEspecialidades().subscribe(especialidades => {
      console.log("especialidades:",especialidades);
      this._hs.especialidades = especialidades;
      this.especialidades = especialidades;
    })
    let fecha = new Date();
    this.fechaPlaceHolder = fecha.getDate() + "-" + parseInt(fecha.getMonth() + 1) + "-" + fecha.getFullYear();
  }

  buscar() {
    if (!this.isValidForm()){
      return;
    }
    this._hs.busqueda = this.busqueda;
    this._router.navigateByUrl('/home/buscar');
  }

  medChanged(event: any) {
  }

  espChanged(event: any) {
    this.selectedEspecialidad = this.busqueda.especialidad.id;
    this.getMedicosByEspecialidad();
  }

  getMedicosByEspecialidad() {
    this._hs.getMedicos(this.selectedEspecialidad).subscribe((medicos: object) => {
      this.medicos = medicos['doctors'];
      this._hs.medicos = medicos['doctors'];
    })
  }

  private isValidForm = ():boolean => {
    const anyMissing = this.requiredFields.some( (key) => {
      const value = this.busqueda[key];
      return ((value == null) || (value === ''));
    });
    if (anyMissing){
      this.errorMessage = 'Todos los campos son obligatorios';
      return false;
    }
    let regex = new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{4}$')
    if (this.busqueda['fecha'] != "" && !regex.test(this.busqueda['fecha'])){
      this.errorMessage = 'La fecha tiene formato invalido (dd-MM-aaaa)';
      return false;
    }
    this.errorMessage = "";
    return true;
  }

}

import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import { Medico, Especialidad } from '../model/model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	listado: any = {
		mostrar: false
	}

  medicos: Array<Medico> = []
  especialidades: Array<Especialidad> = []
  selectedEspecialidad: string;
  busqueda: any = {
    especialidad: "",
    medico: "",
    fecha: ""
  }

  constructor(private _hs: HttpService) { }

  ngOnInit() {
    this._hs.getEspecialidades().subscribe(especialidades => {
      console.log(especialidades)
      this._hs.especialidades = especialidades;
      this.especialidades = especialidades;
    })
  }

  buscar() {
  	this.listado.mostrar = true;
    this._hs.busqueda = this.busqueda;
  }

  medChanged(event: any) {
    this.busqueda.medico = event.target.value;
  }

  espChanged(event: any) {
    this.busqueda.especialidad = event.target.value 
    this.selectedEspecialidad = event.target.value;
    console.log(this.selectedEspecialidad);
    this.getMedicosByEspecialidad();
  }

  getMedicosByEspecialidad() {
    this._hs.getMedicos(this.selectedEspecialidad).subscribe(medicos => {
      console.log(medicos);
      this.medicos = medicos.doctors;
      this._hs.medicos = medicos.doctors;
    })
  }

}

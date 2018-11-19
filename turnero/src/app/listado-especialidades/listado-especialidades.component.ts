import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import { Especialidad } from '../model/model'

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.css']
})
export class ListadoEspecialidadesComponent implements OnInit {

	especialidades: Array<Especialidad>

	constructor(private _hs:HttpService) { }

	ngOnInit() {
		this._hs.getEspecialidades().subscribe(resp => {
			this.especialidades = resp;
		})
	}

}

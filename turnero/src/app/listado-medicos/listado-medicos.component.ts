import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

import { Medico, MedicosResponse } from '../model/model'

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.css']
})
export class ListadoMedicosComponent implements OnInit {

	medicos: Array<Medico> = new Array<Medico>();

	constructor(private _hs: HttpService) { }

	ngOnInit() {
		this._hs.getTodosLosMedicos().subscribe((resp: MedicosResponse) => {
			if(resp.success) {
				this.medicos = resp.doctors;
			}
		})
	}

}

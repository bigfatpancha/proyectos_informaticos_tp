import { Component, OnInit } from '@angular/core';

import {SessionService} from "../session.service";
import { HttpService } from '../http.service';
import {Medico, Especialidad, PersonalData, Appointment} from '../model/model'
import {Router} from "@angular/router";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
	personalData: PersonalData;
	appointments: Array<Appointment> = []

	constructor(private _sessionService: SessionService,
		private _hs: HttpService,
		private _router: Router) { }

	ngOnInit() {
		this.personalData = this._sessionService.getPersonalData();
		this.personalData = this._sessionService.getPersonalData();
		if (!this.personalData){
			this._router.navigateByUrl('/login');
		}
		this._hs.getHistorial(this.personalData.id).subscribe( resp => {
			if(resp.success) {
				this.appointments = resp.appointments;
			}
		})
	}

	cancelar(appointment: Appointment) {
		appointment.state = 'Cancelado'
		this._hs.modificarTurno(appointment).subscribe( () => {

		})
	}

}

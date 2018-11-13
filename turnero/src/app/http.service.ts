import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Medico, Especialidad, Turno } from './model/model'
import {Observable} from "rxjs";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	url: string = 'http://localhost:3000/';
	httpOptions = {
		headers: new HttpHeaders({ 
			'content-type': 'application/json',
			'accept': 'application/json',
			'Access-Control-Allow-Origin': '*'
		})
	};

	medicos:Array<Medico> = [];
	especialidades:Array<Especialidad> = [];
	turnos:Array<Turno> = [{"start_time":"2018-11-06T12:00:00.000Z","end_time":"2018-11-06T12:30:00.000Z","available":true},{"start_time":"2018-11-06T12:30:00.000Z","end_time":"2018-11-06T13:00:00.000Z","available":true},{"start_time":"2018-11-06T13:00:00.000Z","end_time":"2018-11-06T13:30:00.000Z","available":true},{"start_time":"2018-11-06T13:30:00.000Z","end_time":"2018-11-06T14:00:00.000Z","available":true},{"start_time":"2018-11-06T14:00:00.000Z","end_time":"2018-11-06T14:30:00.000Z","available":true},{"start_time":"2018-11-06T14:30:00.000Z","end_time":"2018-11-06T15:00:00.000Z","available":true},{"start_time":"2018-11-06T15:00:00.000Z","end_time":"2018-11-06T15:30:00.000Z","available":true},{"start_time":"2018-11-06T15:30:00.000Z","end_time":"2018-11-06T16:00:00.000Z","available":true},{"start_time":"2018-11-06T16:00:00.000Z","end_time":"2018-11-06T16:30:00.000Z","available":true},{"start_time":"2018-11-06T16:30:00.000Z","end_time":"2018-11-06T17:00:00.000Z","available":true},{"start_time":"2018-11-06T17:00:00.000Z","end_time":"2018-11-06T17:30:00.000Z","available":true},{"start_time":"2018-11-06T17:30:00.000Z","end_time":"2018-11-06T18:00:00.000Z","available":true},{"start_time":"2018-11-06T18:00:00.000Z","end_time":"2018-11-06T18:30:00.000Z","available":true},{"start_time":"2018-11-06T18:30:00.000Z","end_time":"2018-11-06T19:00:00.000Z","available":true},{"start_time":"2018-11-06T19:00:00.000Z","end_time":"2018-11-06T19:30:00.000Z","available":true},{"start_time":"2018-11-06T19:30:00.000Z","end_time":"2018-11-06T20:00:00.000Z","available":true}];
	busqueda:any = {};
  selectedTurno: Turno;

  constructor(private http: HttpClient,
    private _sessionService: SessionService) { }
  
  getMedicos(especialidad: string): Observable<Medico[]> {
  	return this.http.get<Medico[]>(this.url + 'specialties/'+especialidad+'/doctors', this.httpOptions);
  }

  getEspecialidades(): Observable<Especialidad[]> {
  	return this.http.get<Especialidad[]>(this.url + 'specialties', this.httpOptions);
  }

  getTurnos(): Observable<Turno[]> {
  	let url = this.url + 'schedule/'+ this.busqueda.medico.id;
  	if(this.busqueda.fecha != ''){
      url = url +'?date=' + this.busqueda.fecha;
    }
  	return this.http.get<Turno[]>(url, this.httpOptions);
  }

  login(email: string, password: string): Observable<object> {
    return this.http.post(
      this.url + 'auth/login',
      {
        email: email,
        password: password
      }
    );
  }

  register(fields: object): Observable<object> {
    return this.http.post(
      this.url + 'auth/register',
      fields
    );
  }

  confirmarTurno(): Observable<object> {
    let url = this.url + 'appointment';
    let body = {
      patient_id: this._sessionService.getPersonalData().id,
      doctor_id: this.busqueda.medico.id,
      date: this.selectedTurno.start_time;
    }
    return this.http.post(url, body)
  }
  
}

import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import { Turno } from '../model/model'

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

	turnos: Array<Turno> = []

  constructor(private _hs: HttpService) { }

  ngOnInit() {
  	this._hs.getTurnos().subscribe((turnos:object) => {
      console.log("schedule",turnos.schedule);
      let turnosDiponibles:Array<Turno> = []
      for(let turno of turnos.schedule) {
      	if(turno.available)
      		turnosDiponibles.push(turno)
      }
      this._hs.turnos = turnosDiponibles;
      this.turnos = turnosDiponibles;
    })
  }

  formatDate(date: string) {
  	return date.substring(0, 10) + " a las " + date.substring(11,16)
  }

  confirmarTurno(turno: Turno) {
  	console.log('Confirmar turno', turno)
  }

}

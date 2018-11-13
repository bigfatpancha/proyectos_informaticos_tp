import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import { Turno } from '../model/model'
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

	turnos: Array<Turno> = []
  medico: Object
  fecha: String

  constructor(
    private _hs: HttpService,
    private _sessionService: SessionService,
    private _router: Router,
  ) { }

  ngOnInit() {
    if (!this._sessionService.getPersonalData()){
      this._router.navigateByUrl('/login');
    }  
  	this._hs.getTurnos().subscribe((turnos:object) => {
      if(turnos.success) {
        if(turnos != null) {
          console.log("schedule",turnos['schedule']);
          let turnosDiponibles:Array<Turno> = []
          for(let turno of turnos['schedule']) {
            if(turno.available)
              turnosDiponibles.push(turno)
          }
          this._hs.turnos = turnosDiponibles;
          this.turnos = turnosDiponibles;
        }
      }
      this.medico = this._hs.medicos.filter(medico => medico.id = this._hs.busqueda.medico.id)[0];
      this.fecha = this._hs.busqueda.fecha;

      this.turnos = [
        {
          start_time: "2018-11-13 17:00",
          end_time: "17:30",
          available: true
        }

      ]
    })
  }

  formatDate(date: string) {
  	return date.substring(11,16)
  }

  confirmarTurno(turno: Turno) {
  	console.log('Confirmar turno', turno)
    this._hs.selectedTurno = turno;
  }

}

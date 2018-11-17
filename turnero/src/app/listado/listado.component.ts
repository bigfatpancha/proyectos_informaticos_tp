import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'
import { Turno , TurnoResponse} from '../model/model'
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
  	this._hs.getTurnos().subscribe((resp:TurnoResponse) => {
      if(resp.success) {
        if(resp.schedule != null) {
          let turnos= resp.schedule;
          let turnosDiponibles:Array<Turno> = []
          for(let turno of turnos) {
            if(turno.available)
              turnosDiponibles.push(turno)
          }
          this._hs.turnos = turnosDiponibles;
          this.turnos = turnosDiponibles;
        }
      } else {
        this.turnos = [{start_time: "           18-11"}]
      }
      this.medico = this._hs.medicos.filter(medico => medico.id = this._hs.busqueda.medico.id)[0];
      this.fecha = this._hs.busqueda.fecha;

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

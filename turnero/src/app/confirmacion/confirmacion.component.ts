import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service'

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

	message: string = "";

  constructor(private _hs: HttpService) { }

  ngOnInit() {
  	this._hs.confirmarTurno().subscribe((resp) => {
      if(resp.success)
        this.message = "Tu turno fue confirmado";
      else
        this.message = "tu turno no fue regustrado"
  	})
  }

}

import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session.service";

import { PersonalData } from '../model/model'

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

	personalData: PersonalData;

	constructor(private _sessionService: SessionService) { }

	ngOnInit() {
		this.personalData = this._sessionService.getPersonalData();
	}

	salir() {
		this._sessionService.salir()
	}

}

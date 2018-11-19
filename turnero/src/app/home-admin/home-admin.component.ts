import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session.service";
import {Router} from "@angular/router";
import {Medico, Especialidad, PersonalData} from '../model/model'

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

	personalData: PersonalData;

	constructor(private _sessionService: SessionService,
		private _router: Router) { }

	ngOnInit() {
		this.personalData = this._sessionService.getPersonalData();
		if (!this.personalData){
			this._router.navigateByUrl('/login');
		}
	}

}

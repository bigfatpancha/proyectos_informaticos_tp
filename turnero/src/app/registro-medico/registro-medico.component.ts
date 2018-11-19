import { Component, OnInit } from '@angular/core';

import {HttpService} from "../http.service";
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

import { MedicoRequest, MedicoResponse, Especialidad} from '../model/model'

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.component.html',
  styleUrls: ['./registro-medico.component.css']
})
export class RegistroMedicoComponent implements OnInit {

	public fields:object = {
		especialidad: '',
		email: '',
		name: '',
		surname: '',
		phone: '',
		password: '',
		confirmPassword: ''
	};
	especialidades: Array<Especialidad>

	private requiredFields:string[] = ['especialidad', 'email', 'name', 'surname', 'password', 'confirmPassword'];

	public errorMessage:string = '';
	public registered:boolean = false;

	constructor(private _hs: HttpService,
    	private _router: Router) { }

	ngOnInit() {
		this._hs.getEspecialidades().subscribe((resp) => {
			this.especialidades = resp;
		})
	}

	public registrar = () => {
		this.errorMessage = '';
		if (!this.isValidForm()){
			return;
		}
		this.doRegister();
	};

	private isValidForm = ():boolean => {
		const anyMissing = this.requiredFields.some( (key) => {
		const value = this.fields[key];
			return ((value == null) || (value === ''));
		});
		if (anyMissing){
			this.errorMessage = 'Todos los campos son obligatorios';
			return false;
		}
		if (this.fields['password'] != this.fields['confirmPassword']){
			this.errorMessage = 'Las contraseñas no coinciden';
			return false;
		}
		if (!this.isSecurePassword(this.fields['password'])){
			this.errorMessage = 'La contraseña tiene que tener mínimo 8 caracteres, un numero, y una letra';
			return false;
		}
		return true;
	};

	private isSecurePassword = (password:string):boolean => {
		return (password.length >= 8) && this.hasNumber(password) && this.hasLetter(password);
	};

	private hasNumber = (myString: string):boolean =>  {
		return /\d/.test(myString);
	};

	private hasLetter = (myString: string):boolean =>  {
		return /[A-Za-z]/.test(myString);
	};

	doRegister() {
    	let request = new MedicoRequest(
    			this.fields['name'],
    			this.fields['surname'],
    			this.fields['password'],
    			this.fields['email'],
    			this.fields['phone'],
    			this.fields['especialidad'].id
    		)
		this._hs.addNewDoctor(request).subscribe((result: MedicoResponse) => {
			if (result.success){
        		this.registered = true;
        		this._router.navigateByUrl('/admin/medicos');
      		} else {
        		this.errorMessage = (result.error == 'user already exists')
          		? 'El medico ya existe'
          		: 'Hubo un error';
      		}
    	});
	}

}

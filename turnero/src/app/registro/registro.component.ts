import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public fields:object = {
    email: '',
    name: '',
    surname: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  private requiredFields:string[] = ['email', 'name', 'surname', 'password', 'confirmPassword'];

  public errorMessage:string = '';
  public registered:boolean = false;

  constructor(
    private _hs: HttpService,
    private _router: Router,
  ) { }

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

  private doRegister = () => {
    let fieldsData = {... this.fields};
    delete fieldsData['confirmPassword'];
console.log(fieldsData)
    this._hs.register(fieldsData).subscribe((result: object) => {
      if (result['success']){
        this.registered = true;
        this._router.navigateByUrl('/login');
      } else {
        this.errorMessage = (result['error'] == 'user already exists')
          ? 'El usuario ya existe'
          : 'Hubo un error';
      }
    });
  }

}

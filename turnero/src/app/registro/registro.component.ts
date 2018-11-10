import { Component, OnInit } from '@angular/core';

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
    confirmPassword: '',
  };

  public errorMessage = '';

  constructor() { }

  public registrar = () => {
  	this.errorMessage = '';
  	console.log("fields:",this.fields);
  	if (!this.isValidForm()){
  	  return;
    }
    this.errorMessage = "formulario valido";
  };

  private isValidForm = ():boolean => {
    const anyMissing = Object.keys(this.fields).some( (key) => {
      const value = this.fields[key];
      return ((value == null) || (value === ''));
    });
    if (anyMissing){
      this.errorMessage = 'Todos los campos son obligatorios';
      return false;
    }
    if (this.fields.password != this.fields.confirmPassword){
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }
    if (!this.isSecurePassword(this.fields.password)){
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

}

import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {SessionService} from "../session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = {
    email: '',
    password: ''
  };

  public errorMessage = '';


  constructor(
    private _hs: HttpService,
    private _sessionService: SessionService,
    private _router: Router,
    ) { }

  login() {
  	this.errorMessage = '';
    this._hs.login(this.credentials.email, this.credentials.password).subscribe((result: object) => {
      console.log("result:",result);
      if (result['success']){
        this._sessionService.setPersonalData(result['user']);
        this._router.navigateByUrl('/home');
      } else {
        this.errorMessage = (result['error'] == 'invalid credentials')
          ? 'Credenciales Inválidas'
          : 'Hubo un error';
      }
    });
  };

  irARegistro() {
  	
  }

}

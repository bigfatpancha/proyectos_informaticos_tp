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

  private readonly ADMIN_HOME_URL = '/admin'; //TODO: cambiar a /admin
  private readonly USER_HOME_URL = '/home';

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
      if (result['success']){
        this.loginSuccess(result['user']);
      } else {
        this.errorMessage = (result['error'] == 'invalid credentials')
          ? 'Credenciales Inválidas'
          : 'Hubo un error';
      }
    });
  };

  private loginSuccess = (personalData: object) => {
    this._sessionService.setPersonalData(personalData);
    const redirectUrl = (this.isAdmin(personalData)) ? this.ADMIN_HOME_URL : this.USER_HOME_URL;
    this._router.navigateByUrl(redirectUrl);
  };

  private isAdmin = (personalData: object): boolean => {
    return ('role' in personalData) && (personalData['role'] == 'Admin');
  };

}

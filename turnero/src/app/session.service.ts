import {PersonalData} from "./model/model";
import {Injectable} from "@angular/core";

import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private personalData: PersonalData;

  constructor(private _router: Router) {
  }

  public getPersonalData = ():PersonalData => {
    if (!this.personalData){
      const savedData = JSON.parse(sessionStorage.getItem('personalData'));
      this.personalData = (savedData) ? <PersonalData>savedData : null;
    }
    return this.personalData;
  };

  public setPersonalData = (rawData:object) => {
    this.personalData = <PersonalData>rawData;
    sessionStorage.setItem('personalData', JSON.stringify(this.personalData));
  };

  salir() {
    if(this.personalData) {
      sessionStorage.removeItem('personalData');
      this._router.navigateByUrl('/login');
    }
  }


}

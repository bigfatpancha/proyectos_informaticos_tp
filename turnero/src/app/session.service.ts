import {PersonalData} from "./model/model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private personalData: PersonalData;

  constructor() {
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


}

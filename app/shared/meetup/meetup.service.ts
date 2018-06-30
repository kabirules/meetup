import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../config";



@Injectable()
export class MeetUpService {
  constructor(private http: Http) {}

  METHOD_CITIES = '/2/cities';

  getCities() {
    const url =   Config.meetUpHost +
                  this.METHOD_CITIES + 
                  '?offset=0&format=json&photo-host=public&page=20&radius=50&order=size&desc=false' +
                  '&sig_id=' + Config.sig_id +
                  '&sig=' + Config.sig;
    return this.http.get(url)
      .map(response => response.json())
      .do(data => {
        console.log(data);
      })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }


  
}
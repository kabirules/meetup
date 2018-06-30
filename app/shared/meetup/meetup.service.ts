import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class MeetUpService {
  constructor(private http: Http) {}

  getCities() {
    const url = '';
    return this.http.get(url)
      .map(response => response.json())
      .do(data => {
      })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }


  
}
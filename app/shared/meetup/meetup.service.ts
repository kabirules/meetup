import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../config";
import { City } from "~/shared/meetup/city";
import { Meta } from "~/shared/meetup/meta";
import { Topic } from "~/shared/meetup/topic";
import { Group } from "~/shared/meetup/group";
import { Member } from "~/shared/meetup/member";



@Injectable()
export class MeetUpService {
  constructor(private http: Http) {}

  METHOD_CITIES = '/2/cities';
  METHOD_TOPICS = '/find/topics';
  METHOD_GROUPS = '/find/groups';

  getCities() {
    const url = Config.meetUpHost +
                this.METHOD_CITIES + 
                '?offset=0&format=json&photo-host=public&page=20&radius=50&order=size&desc=false&lat=51.52&lon=-0.24';
    return this.http.get(url)
      .map(response => { 
        const results = <Array<City>>response.json().results;
        return results;
      })
      .do(data => {
      })
      .catch(this.handleErrors);
  }

  getTopics(query: string) {
    const url = Config.meetUpHost +
                this.METHOD_TOPICS + 
                '?photo-host=public&page=20&query=' + query; 
    return this.http.get(url)
    .map(response => { 
      const topics = <Array<Topic>>response.json();
      topics.forEach(element => {
        // console.log(element);
      });
      return topics;
    })
    .do(data => {
    })
    .catch(this.handleErrors);                
  }

  // TODO send lat & long
  // Returns only groups with join_mode 'open'
  getGroups(lat: number, lon: number) {
    // lat = 41.9097; // TODO get it from GPS
    // lon = 12.2558;
    const latUrl = (lat !== null && lat !== undefined) ? '&lat=' + lat : ''
    const lonUrl = (lon !== null && lon !== undefined) ? '&lon=' + lon : ''
    const url = Config.meetUpHost +
                this.METHOD_GROUPS +
                '?photo-host=public&page=20&sign=true' +
                '&key=' + Config.API_KEY +
                latUrl + 
                lonUrl;
    return this.http.get(url)
      .map(response => { 
        const result = new Array<Group>();
        const groups = <Array<Group>>response.json();
        groups.forEach(element => {
          if (element.join_mode === 'open') {
            //console.log(element.name);
            result.push(element);
          }
        });
        return result;
      })
      .do(data => {
      })
      .catch(this.handleErrors);
  }

  // Make sure the member has photo
  getProfiles(urlname: string) {
    const url = Config.meetUpHost + '/' + 
                urlname +
                '/members?&photo-host=public&page=20' +
                'sign=true' +
                '&key=' + Config.API_KEY;
    return this.http.get(url)
    .map(response => {
      const members = <Array<Member>>response.json();
      const result = new Array<Member>();
      members.forEach(element => {
        if (element.photo) {
          result.push(element);
        }
      });
      return result;
    })
    .do(data => {
    })
    .catch(this.handleErrors);                
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
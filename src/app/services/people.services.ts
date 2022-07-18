import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {People} from "../../models/people";

@Injectable({providedIn: 'root'})
export class PeopleServices{
  private readonly endpoint: 'https://swapi.dev/api/people/1/';

  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<People> {
    return this.http.get<People>(this.endpoint);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { People } from "src/app/models/people";

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly endpoint = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<People> {
    return this.http.get<People>(this.endpoint);
  }

}

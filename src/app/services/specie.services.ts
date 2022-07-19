import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specie} from "../models/specie";

@Injectable({providedIn: 'root'})
export class SpecieServices {
  private readonly endpoint = 'https://swapi.dev/api/species/';

  constructor(private http: HttpClient) {}

  getAllSpecie(): Observable<Specie> {
    return this.http.get<Specie>(this.endpoint);
  }
}

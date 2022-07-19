import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Planet} from "../models/planet";


@Injectable({ providedIn: 'root'})
export class PlanetServices {
  private readonly endpoint= 'https://swapi.dev/api/planets/';

  constructor(private http: HttpClient) {}

  getAllPlanets(): Observable<Planet>{
    return this.http.get<Planet>(this.endpoint);
  }

}

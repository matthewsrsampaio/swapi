import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Starship} from "../models/startship";


@Injectable({providedIn: 'root'})
export class StarshipServices{
  private readonly endpoint = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  getAllStarships(): Observable<Starship>{
    return this.http.get<Starship>(this.endpoint);
  }

}

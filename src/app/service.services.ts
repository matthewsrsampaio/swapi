import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Film} from "./models/film";
import {Planet} from "./models/planet";
import {People} from "./models/people";
import {Specie} from "./models/specie";
import {Starship} from "./models/startship";
import {Vehicle} from "./models/vehicle";
import {ActivatedRoute} from "@angular/router";

@Injectable({providedIn: 'root'})
export class ServiceServices {
  private readonly endpointFilms = 'https://swapi.dev/api/films/';
  private readonly endpointPeople = 'https://swapi.dev/api/people/';
  private readonly endpointPlanets = 'https://swapi.dev/api/planets/';
  private readonly endpointSpecies = 'https://swapi.dev/api/species/';
  private readonly endpointStarships = 'https://swapi.dev/api/starships/';
  private readonly endpointVehicles = 'https://swapi.dev/api/vehicles/';

  constructor(public http: HttpClient) {}

  getAllFilm(): Observable<any> {
    return this.http.get<Film>(this.endpointFilms);
  }

  getAllPeople(): Observable<any> {
    return this.http.get<People>(this.endpointPeople);
  }

  getAllPlanets(): Observable<any> {
    return this.http.get<Planet>(this.endpointPlanets);
  }

  getAllSpecie(): Observable<any> {
    return this.http.get<Specie>(this.endpointSpecies);
  }

  getAllStarships(): Observable<any>{
    return this.http.get<Starship>(this.endpointStarships);
  }

  getAllVehicle(): Observable<any>{
    return this.http.get<Vehicle>(this.endpointVehicles);
  }

}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Film} from "./models/film";
import {Planet} from "./models/planet";
import {People} from "./models/people";
import {Specie} from "./models/specie";
import {Starship} from "./models/startship";
import {Vehicle} from "./models/vehicle";

//Primeira parte da captura da SWAPI
@Injectable({providedIn: 'root'})
export class ServiceServices {
  private readonly endpointFilms = 'https://swapi.dev/api/films/';
  private readonly endpointPeople = 'https://swapi.dev/api/people/';
  private readonly endpointPlanets = 'https://swapi.dev/api/planets/';
  private readonly endpointSpecies = 'https://swapi.dev/api/species/';
  private readonly endpointStarships = 'https://swapi.dev/api/starships/';
  private readonly endpointVehicles = 'https://swapi.dev/api/vehicles/';

  constructor(public http: HttpClient) {}

  //Segunda parte da captura da SWAPI
  getAllFilm(): Observable<any> {
    return this.http.get<Film>(this.endpointFilms);
  }

  getFilm(id: number): Observable<any>  {
    return this.http.get<Film>(`${this.endpointFilms}/${id}`); //Por exemplo: https://swapi.dev/api/films/:id/
  }

  getAllPeople(): Observable<any> {
    return this.http.get<People>(this.endpointPeople);
  }

  getPeople(id: number): Observable<any>  {
    return this.http.get<People>(`${this.endpointPeople}/${id}`);
  }

  getAllPlanets(): Observable<any> {
    return this.http.get<Planet>(this.endpointPlanets);
  }

  getPlanet(id: number): Observable<any>  {
    return this.http.get<Planet>(`${this.endpointPlanets}/${id}`);
  }

  getAllSpecies(): Observable<any> {
    return this.http.get<Specie>(this.endpointSpecies);
  }

  getSpecie(id: number): Observable<any>  {
    return this.http.get<Specie>(`${this.endpointSpecies}/${id}`);
  }

  getAllStarships(): Observable<any>{
    return this.http.get<Starship>(this.endpointStarships);
  }

  getStarship(id: number): Observable<any>  {
    return this.http.get<Starship>(`${this.endpointStarships}/${id}`);
  }

  getAllVehicle(): Observable<any>{
    return this.http.get<Vehicle>(this.endpointVehicles);
  }

  getVehicle(id: number): Observable<any>  {
    return this.http.get<Vehicle>(`${this.endpointVehicles}/${id}`);
  }

}

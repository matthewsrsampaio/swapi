import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Film} from "../models/film";

@Injectable({providedIn: 'root'})
export class FilmServices {
  private readonly endpoint = 'https://swapi.dev/api/films/';

  constructor( private http: HttpClient) {}

  getAllFilm(): Observable<Film> {
    return this.http.get<Film>((this.endpoint));
  }

}

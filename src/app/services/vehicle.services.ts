import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../models/vehicle";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class VehicleServices{
  private readonly endpoint = 'https://swapi.dev/api/vehicles/'

  constructor(private http: HttpClient) {}

  getAllVehicle(): Observable<Vehicle>{
    return this.http.get<Vehicle>(this.endpoint);
  }

}

import {Component, OnInit} from '@angular/core';
import {Planet} from "../../models/planet";
import {ServiceServices} from "../../service.services";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';
import {Film} from "../../models/film";
import {People} from "../../models/people";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css'],
  providers: [ServiceServices]
})
export class PlanetComponent implements OnInit {
  planets: Planet[] = [];
  residents: People[] = [];
  films: Film[] = [];
  displayedColumns: string[] = ['name', 'climate', 'gravity', 'rotation', 'diameter', 'orbital', 'population', 'surfaceWater', 'terrain', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.planets);
  clickedRows = new Set<Planet>();
  selectedRow: any;
  isLoading = true;
  validateResidents = true;


  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllPlanets();
  }

  //Select and delete data from table and show extra data into the cards below
  selectRow(row) {
    if(this.selectedRow) {
      this.clickedRows.delete(this.selectedRow);
    }
    this.selectedRow = row;
    this.clickedRows.add(this.selectedRow);
  }

  //Method to clean extra data
  clearData() {
    this.planets = [];
    this.residents = [];
    this.films = [];
  }

  //This method collects all data from SWAPI
  onGetAllPlanets() {
    this.serviceServices.getAllPlanets()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data.results);
        console.log(this.planets);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Split URL to collect all id
  collectUrlId(get: string): string {
    const splitPath = get.split('/')
    const id: string = splitPath[splitPath.length - 2]
    return id;
  }

  //Method responsible for bringing the extra data
  onClick(planet: Planet) {
    //Resets validation to TRUE every click at the methods below, if request fail validation gets FALSE.
    //This validation is used to decide whether the Extra Card will be shown or not.
    this.validateResidents = true;
    //Method sets arrays to empty
    this.clearData();
    //All methods bellow are responsible to collect extra data
    planet.films.forEach(film => {
      this.serviceServices.getFilm(parseInt(this.collectUrlId(film)))
        .subscribe((data) => {
            this.films.push(data)
          })
    })
    planet.residents.forEach(resid => {
      this.serviceServices.getPeople(parseInt(this.collectUrlId(resid)))
        .subscribe( (data) => {
          this.residents.push(data)
          if (this.validateResidents) {
            this.validateResidents = false;
          }
        })
    })
  }
}

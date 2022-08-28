import {Component, OnInit} from '@angular/core';
import {People} from "../../models/people";
import {ServiceServices} from "../../service.services";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';
import {Film} from "../../models/film";
import {Starship} from "../../models/startship";
import {Specie} from "../../models/specie";
import {Vehicle} from "../../models/vehicle";
import {Planet} from "../../models/planet";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  people: People[] = [];
  films: Film[] = [];
  starships: Starship[] = [];
  species: Specie[] = [];
  vehicles: Vehicle[] = [];
  planets: Planet[] = [];
  displayedColumns: string[] = ['name', 'gender', 'skinColor', 'hairColor', 'eyeColor', 'height', 'mass', 'birth', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.people);
  clickedRows = new Set<People>();
  isLoading = true;
  selectedRow: any;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllPeople();
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
    this.people = []
    this.films = [];
    this.starships = [];
    this.species = [];
    this.vehicles = [];
    this.planets = [];
}

  //This method collects all data from SWAPI
  onGetAllPeople() {
    this.serviceServices.getAllPeople()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data.results);
      });
  }

  //Method to filter table
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
  onClick(people: People) {
    this.clearData();
    //All methods bellow are responsible to collect extra data
    people.films.forEach(film => {
      this.serviceServices.getFilm(parseInt(this.collectUrlId(film)))
        .subscribe((data) => {
          this.films.push(data)
        })
    })
    people.starships.forEach(star => {
      this.serviceServices.getStarship(parseInt(this.collectUrlId(star)))
        .subscribe((data) => {
          this.starships.push(data)
        })
    })
    people.species.forEach(spec => {
      this.serviceServices.getSpecie(parseInt(this.collectUrlId(spec)))
        .subscribe((data) => {
          this.species.push(data)
        })
    })
    people.vehicles.forEach(vehi => {
      this.serviceServices.getVehicle(parseInt(this.collectUrlId(vehi)))
        .subscribe((data) => {
          this.vehicles.push(data)
        })
    })
    //This requestis special because it's not into an array, therefore its request different
      const splitPath = people.homeworld.split('/')
      const id: string = splitPath[splitPath.length - 2]
      this.serviceServices.getPlanet(parseInt(id))
        .subscribe((data) => {
          this.planets.push(data)
        })
  }
}

import {Component, OnInit} from '@angular/core';
import {Film} from "../../models/film";
import {ServiceServices} from "../../service.services";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {Planet} from "../../models/planet";
import {Starship} from "../../models/startship";
import {Specie} from "../../models/specie";
import {Vehicle} from "../../models/vehicle";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  films: Film[] = [];
  planets: Planet[] = [];
  starships: Starship[] = [];
  species: Specie[] = [];
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['title', 'director', 'producer', 'episode', 'opening', 'release', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.films);
  clickedRows = new Set<Film>();
  isLoading = true;
  selectedRow: any;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllFilms();
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
  resetData() {
    this.films = [];
    this.planets = [];
    this.starships = [];
    this.species = [];
    this.vehicles = [];
  }


  onGetAllFilms() {
    this.serviceServices.getAllFilm()
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
  onClick(film: Film) {
    //Method sets arrays to empty
    this.resetData();
    //All methods bellow are responsible to collect extra data
    film.planets.forEach(plan => {
      this.serviceServices.getPlanet(parseInt(this.collectUrlId(plan)))
        .subscribe((data) => {
          this.planets.push(data)
        })
    })
    film.starships.forEach(star => {
      this.serviceServices.getStarship(parseInt(this.collectUrlId(star)))
        .subscribe( (data) => {
        this.starships.push(data)
      })
    })
    film.species.forEach(spec => {
      this.serviceServices.getSpecie(parseInt(this.collectUrlId(spec)))
        .subscribe( (data) => {
          this.species.push(data)
        })
    })
    film.vehicles.forEach(vehi => {
      this.serviceServices.getVehicle(parseInt(this.collectUrlId(vehi)))
        .subscribe( (data) => {
          this.vehicles.push(data)
        })
    })
  }
}

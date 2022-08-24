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
  displayedColumnsFilms: string[] = ['title', 'director', 'producer', 'episode', 'opening', 'release', 'created', 'edited'];
  dataSourceFilms = new MatTableDataSource(this.films);
  clickedRows = new Set<Film>();
  isLoading = true;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllFilms();
  }

  onGetAllFilms() {
    this.serviceServices.getAllFilm()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSourceFilms = new MatTableDataSource(data.results);
        console.log(this.films);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFilms.filter = filterValue.trim().toLowerCase();
  }

  onClick(film: Film) {
    film.planets.forEach(p => {
      const split = p.split('/')
      const id = split[split.length-2]
      this.serviceServices.getPlanet(parseInt(id))
        .subscribe((data) => {
          this.planets.push(data)
        }
      );
    })
    film.starships.forEach(star => {
      const split = star.split('/')
      const id = split[split.length-2]
      this.serviceServices.getStarship(parseInt(id))
        .subscribe( (data) => {
        this.starships.push(data)
      })
    })
    film.species.forEach(star => {
      const split = star.split('/')
      const id = split[split.length-2]
      this.serviceServices.getSpecie(parseInt(id))
        .subscribe( (data) => {
          this.species.push(data)
        })
    })
    film.vehicles.forEach(star => {
      const split = star.split('/')
      const id = split[split.length-2]
      this.serviceServices.getVehicle(parseInt(id))
        .subscribe( (data) => {
          this.vehicles.push(data)
        })
    })
  }

}

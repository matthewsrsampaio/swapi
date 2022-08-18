import { Component, OnInit } from '@angular/core';
import {Film} from "../../models/film";
import {ServiceServices} from "../../service.services";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  films: Film[] = [];
  displayedColumns: string[] = ['title', 'director', 'producer', 'episode', 'opening', 'release', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.films);
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
        this.dataSource = new MatTableDataSource(data.results);
        console.log(this.films);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

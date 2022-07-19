import { Component, OnInit } from '@angular/core';
import {Film} from "../../models/film";
import {FilmServices} from "../../services/film.services";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  private films!: Film;

  constructor(private filmService : FilmServices) { }

  ngOnInit(): void {
    this.filmService.getAllFilm().subscribe((data:Film) => {
      this.films = data;
      console.log(this.films)
    });
  }

}

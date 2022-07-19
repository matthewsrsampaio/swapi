import { Component, OnInit } from '@angular/core';
import { Starship } from "../../models/startship";
import { StarshipServices } from "../../services/starship.services";

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {

  private starships!: Starship;

  constructor(private starshipServices : StarshipServices) { }

  ngOnInit(): void {
    this.starshipServices.getAllStarships().subscribe((data: Starship) => {
      this.starships = data;
      console.log(this.starships);
    });
  }

}

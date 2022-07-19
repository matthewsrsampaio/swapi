import { Component, OnInit } from '@angular/core';
import { Specie } from "../../models/specie";
import { SpecieServices } from "../../services/specie.services";

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.css']
})
export class SpecieComponent implements OnInit {
  private species!: Specie;

  constructor(private specieServices: SpecieServices) { }

  ngOnInit(): void {
    this.specieServices.getAllSpecie().subscribe((data:Specie) => {
      this.species = data;
      console.log(this.species);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {Planet} from "../../models/planet";
import {ServiceServices} from "../../service.services";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css'],
  providers: [ServiceServices]
})
export class PlanetComponent implements OnInit {
  planets: Planet[] = [];
  displayedColumns: string[] = ['name', 'climate', 'gravity', 'rotation', 'diameter', 'orbital', 'population', 'surfaceWater', 'terrain', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.planets);
  clickedRows = new Set<Planet>();

  constructor(private serviceServices : ServiceServices, public http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.onGetAllPlanets();
  }

  onGetAllPlanets() {
    this.serviceServices.getAllPlanets()
      .subscribe((data) => {
        this.planets = data.results;
        console.log(this.planets);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.clickedRows);
  }

}

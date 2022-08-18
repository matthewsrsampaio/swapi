import {Component, OnInit} from '@angular/core';
import {Planet} from "../../models/planet";
import {ServiceServices} from "../../service.services";
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
  isLoading = true;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllPlanets();
  }

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

}

import { Component, OnInit } from '@angular/core';
import { Specie } from "../../models/specie";
import {ServiceServices} from "../../service.services";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.css']
})
export class SpecieComponent implements OnInit {
  species: Specie[] = [];
  displayedColumns: string[] = ['name', 'skinColor', 'eyeColor', 'hairColor', 'averageHeight', 'averageLifespan', 'classification', 'language', 'designation', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.species);
  clickedRows = new Set<Specie>();
  isLoading = true;

  constructor(private serviceServices : ServiceServices, public http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.onGetAllEspecies();
  }

  onGetAllEspecies() {
    this.serviceServices.getAllSpecie()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data.results);
        console.log(this.species);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

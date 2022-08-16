import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../models/vehicle";
import {ServiceServices} from "../../service.services";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles!: Vehicle[];displayedColumns: string[] = ['name', 'model', 'passengers', 'crew', 'class', 'cargoCapac', 'consumables', 'cost', 'length', 'manufacturer', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.vehicles);
  clickedRows = new Set<Vehicle>();

  constructor(private serviceServices : ServiceServices, public http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.onGetAllVehicles();
  }

  onGetAllVehicles() {
    this.serviceServices.getAllVehicle()
      .subscribe((data) => {
        this.vehicles = data.results;
        console.log(this.vehicles);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

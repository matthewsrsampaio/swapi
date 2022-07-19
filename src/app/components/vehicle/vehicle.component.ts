import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../models/vehicle";
import { VehicleServices } from "../../services/vehicle.services";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  private vehicles!: Vehicle;

  constructor(private vehiclesService : VehicleServices) { }

  ngOnInit(): void {
      this.vehiclesService.getAllVehicle().subscribe((data:Vehicle) => {
      this.vehicles = data;
      console.log(this.vehicles);
    });
  }

}

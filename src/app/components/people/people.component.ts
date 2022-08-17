import {Component, OnInit} from '@angular/core';
import {People} from "../../models/people";
import {ServiceServices} from "../../service.services";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [ServiceServices]
})
export class PeopleComponent implements OnInit {
  people: People[] = [];
  displayedColumns: string[] = ['name', 'gender', 'skinColor', 'hairColor', 'eyeColor', 'height', 'mass', 'birth', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.people);
  clickedRows = new Set<People>();
  isLoading = true;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllPeople();
  }

  onGetAllPeople() {
    this.serviceServices.getAllPeople()
      .subscribe((data) => {
        this.isLoading = false;
        this.people = data.results;
        console.log(this.people);
      });
  }
  //
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}

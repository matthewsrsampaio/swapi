import { Component, OnInit } from '@angular/core';
import { People } from "../../models/people";
import {PeopleService} from "../../services/people.services";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  private peoples!: People;

  constructor(private peopleServices: PeopleService) { }

  ngOnInit(): void {
    this.peopleServices.getAllPeople().subscribe((data: People) => {
      this.peoples = data;
      console.log(this.peoples);
    });
  }

}

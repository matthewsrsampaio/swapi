import {Component, OnInit} from '@angular/core';
import {Specie} from "../../models/specie";
import {ServiceServices} from "../../service.services";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {Film} from "../../models/film";
import {People} from "../../models/people";

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.css']
})
export class SpecieComponent implements OnInit {
  species: Specie[] = [];
  films: Film[] = [];
  peoples: People[] =[];
  displayedColumns: string[] = ['name', 'skinColor', 'eyeColor', 'hairColor', 'averageHeight', 'averageLifespan', 'classification', 'language', 'designation', 'created', 'edited'];
  dataSource = new MatTableDataSource(this.species);
  clickedRows = new Set<Specie>();
  isLoading = true;
  selectedRow: any;

  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllEspecies();
  }

  //Select and delete data from table and show extra data into the cards below
  selectRow(row) {
    if(this.selectedRow) {
      this.clickedRows.delete(this.selectedRow);
    }
    this.selectedRow = row;
    this.clickedRows.add(this.selectedRow);
  }

  //Method to clean extra data
  clearData() {
    this.species = [];
    this.films = [];
    this.peoples = [];
  }

  //This method collects all data from SWAPI
  onGetAllEspecies() {
    this.serviceServices.getAllSpecies()
      .subscribe((data) => {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data.results);
      });
  }

  //Method to filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Split URL to collect all id
  collectUrlId(get: string): string {
    const splitPath = get.split('/')
    const id: string = splitPath[splitPath.length - 2]
    return id;
  }

  //Method responsible for bringing the extra data
  onClick(specie: Specie) {
    this.clearData();
    //All methods bellow are responsible to collect extra data
    specie.films.forEach(film => {
      this.serviceServices.getFilm(parseInt(this.collectUrlId(film)))
        .subscribe((data) => {
          this.films.push(data)
        })
    })
    specie.people.forEach(peop => {
      this.serviceServices.getPeople(parseInt(this.collectUrlId(peop)))
        .subscribe( (data) => {
          this.peoples.push(data)
        })
    })
  }
}

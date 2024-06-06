import {Component, OnInit} from '@angular/core';
import {Starship} from "../../models/startship";
import {ServiceServices} from "../../service.services";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {People} from "../../models/people";
import {Film} from "../../models/film";

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.css']
})
export class StarshipComponent implements OnInit {
  starships: Starship[] = [];
  films: Film[] = [];
  pilots: People[] = [];
  displayedColumns: string[] = ['name', 'model', 'mglt', 'cargo', 'consumable', 'cost', 'crew', 'hyperdrive', 'length', 'manufacturer', 'atmSpeed', 'passengers', 'created','edited'];
  dataSource = new MatTableDataSource(this.starships);
  clickedRows = new Set<Starship>();
  selectedRow: any;
  isLoading = true;
  validatePilots = true;


  constructor(private serviceServices : ServiceServices, public http: HttpClient) {}

  ngOnInit() {
    this.onGetAllStarships();
  }

  //Select and delete data from table and show extra data into the cards below
    selectRow(row) {
    if(this.selectedRow) {
      this.clickedRows.delete(this.selectedRow);
    }
    this.selectedRow = row;
    this.clickedRows.add(this.selectedRow);
  }

  //Method to reset extra data & validation
  resetData() {
    this.starships = [];
    this.films = [];
    this.pilots = [];
    //Resets validation to TRUE every click at the methods below, if request fail validation gets FALSE.
    //This validation is used to decide whether the Extra Card will be shown or not.
    this.validatePilots = true;
  }

  //This method collects all data from SWAPI
  onGetAllStarships() {
    this.serviceServices.getAllStarships()
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
  onClick(starship: Starship) {
    //Method to reset extra data & validation
    this.resetData();
    //All methods bellow are responsible to collect extra data
    starship.films.forEach(film => {
      this.serviceServices.getFilm(parseInt(this.collectUrlId(film)))
        .subscribe((data) => {
          this.films.push(data)
        })
    })
    starship.pilots.forEach(pilot => {
      this.serviceServices.getPeople(parseInt(this.collectUrlId(pilot)))
        .subscribe( (data) => {
          this.pilots.push(data)
          if (this.pilots) {
            this.validatePilots = false;
          }
        })
    })
    //Scrolls down page at click
    window.scrollTo(0,document.body.scrollHeight);
  }
}

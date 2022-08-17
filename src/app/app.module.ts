import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from "@angular/material/form-field";

import { AppComponent } from './app.component';
import { PlanetComponent } from './components/planet/planet.component';
import { FilmComponent } from './components/film/film.component';
import { StarshipComponent } from './components/starship/starship.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { SpecieComponent } from './components/specie/specie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {PeopleComponent} from "./components/people/people.component";
import {AppRoutingModule} from "./app-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PlanetComponent,
    FilmComponent,
    StarshipComponent,
    VehicleComponent,
    SpecieComponent,
    NavbarComponent,
    PeopleComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatCardModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

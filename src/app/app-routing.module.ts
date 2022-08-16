import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PlanetComponent} from "./components/planet/planet.component";
import {PeopleComponent} from "./components/people/people.component";
import {FilmComponent} from "./components/film/film.component";
import {SpecieComponent} from "./components/specie/specie.component";
import {StarshipComponent} from "./components/starship/starship.component";
import {VehicleComponent} from "./components/vehicle/vehicle.component";

const appRoutes: Routes = [
  {path: '',  redirectTo: '/', pathMatch: 'full'},
  {path: 'planets', component: PlanetComponent, children: [{path: ':id', component: PlanetComponent}]},
  {path: 'peoples', component: PeopleComponent},
  {path: 'films', component: FilmComponent, children: [{path: ':id', component: FilmComponent}]},
  {path: 'species', component: SpecieComponent},
  {path: 'starships', component: StarshipComponent},
  {path: 'vehicles', component: VehicleComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Film } from "./film";
import {Starship} from "./startship";
import {Specie} from "./specie";

export interface People {
  birth_year: string;
  eye_color: string;
  films: Film[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: Specie[];
  starships: Starship[];
  url: string;
  vehicles: string[];
}

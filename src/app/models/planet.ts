import { Film } from "./film";
import { People } from "./people";

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: Film[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: People[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

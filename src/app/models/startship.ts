import { Film } from "./film";
import { People } from "./people";

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumable: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacture: string;
  max_atmosphering_speed: string;
  model: string,
  name: string,
  passengers: number,
  films: Film[],
  pilots: People[],
  starship_class: string,
  url: string;
}

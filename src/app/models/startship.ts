import { Film } from "./film";
import { People } from "./people";

export interface Starship {
  name: string,
  model: string,
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  passengers: number,
  films: Film[],
  pilots: People[],
  starship_class: string,
  url: string;
}

export interface Stat {
  name: string;
  base: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats?: Stat[];
  abilities?: string[];
}

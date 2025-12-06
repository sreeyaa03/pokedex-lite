import { Pokemon } from "@/types/Pokemon";

export async function fetchPokemons(
  page = 0,
  limit = 20
): Promise<{ pokemons: Pokemon[]; count: number }> {
  const offset = page * limit;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  const data = await res.json();

  const results = await Promise.all(
    data.results.map(async (item: any) => {
      const pokemonRes = await fetch(item.url);
      if (!pokemonRes.ok) return null;
      const pokemon = await pokemonRes.json();

      const mapped: Pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites?.front_default || "",
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((t: any) => t.type.name),
        stats: pokemon.stats
          ? pokemon.stats.map((s: any) => ({
              name: s.stat.name,
              base: s.base_stat,
            }))
          : undefined,
        abilities: pokemon.abilities
          ? pokemon.abilities.map((a: any) => a.ability.name)
          : undefined,
      };

      return mapped;
    })
  );

  return { pokemons: results.filter(Boolean) as Pokemon[], count: data.count };
}

export async function fetchPokemonTypes(): Promise<string[]> {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  if (!res.ok) throw new Error("Failed to fetch types");
  const data = await res.json();
  return data.results.map((t: any) => t.name);
}

export async function fetchAllPokemonList(): Promise<{ name: string; url: string }[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  const data = await res.json();
  return data.results;
}

export async function fetchManyByNames(names: string[]): Promise<Pokemon[]> {
  const results = await Promise.all(
    names.map(async (name) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) return null;
        const pokemon = await res.json();
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites?.front_default || "",
          height: pokemon.height,
          weight: pokemon.weight,
          types: pokemon.types.map((t: any) => t.type.name),
          stats: pokemon.stats
            ? pokemon.stats.map((s: any) => ({ name: s.stat.name, base: s.base_stat }))
            : undefined,
          abilities: pokemon.abilities
            ? pokemon.abilities.map((a: any) => a.ability.name)
            : undefined,
        } as Pokemon;
      } catch (e) {
        return null;
      }
    })
  );

  return results.filter(Boolean) as Pokemon[];
}

export async function fetchPokemonNamesByType(type: string): Promise<{ name: string; url: string }[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) throw new Error("Failed to fetch type list");
  const data = await res.json();
  // data.pokemon is array of { pokemon: { name, url }, slot }
  return data.pokemon.map((p: any) => p.pokemon);
}

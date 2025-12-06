import { useEffect, useState, useCallback, useRef } from "react";
import { Pokemon } from "@/types/Pokemon";
import {
  fetchPokemons,
  fetchAllPokemonList,
  fetchManyByNames,
  fetchPokemonNamesByType,
} from "@/lib/pokeapi";

export const usePokemons = (initialLimit = 20) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const allNamesCache = useRef<{ name: string; url: string }[] | null>(null);

  const fetchData = async (pageArg: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // If user is searching or filtering by type, perform global matching then paginate
      if (query || selectedType) {
        let matchedNames: { name: string; url: string }[] = [];

        if (selectedType) {
          matchedNames = await fetchPokemonNamesByType(selectedType);
        } else {
          if (!allNamesCache.current) {
            allNamesCache.current = await fetchAllPokemonList();
          }
          matchedNames = allNamesCache.current as { name: string; url: string }[];
        }

        if (query) {
          const q = query.toLowerCase();
          matchedNames = matchedNames.filter((m) => m.name.toLowerCase().includes(q));
        }

        setTotal(matchedNames.length);

        const start = pageArg * limit;
        const slice = matchedNames.slice(start, start + limit).map((m) => m.name);
        const data = await fetchManyByNames(slice);
        setPokemons(data);
      } else {
        const { pokemons: data, count } = await fetchPokemons(pageArg, limit);
        setTotal(count);
        setPokemons(data);
      }
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when page or limit changes
  useEffect(() => {
    fetchData(page);
  }, [page, limit]);

  // When query or selectedType change, reset to page 0 and fetch page 0.
  useEffect(() => {
    // If we're already at page 0, just fetch. Otherwise set page to 0 and
    // the other effect will fetch when `page` updates.
    if (page === 0) {
      fetchData(0);
    } else {
      setPage(0);
    }
  }, [query, selectedType]);

  const filtered = pokemons.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = selectedType ? p.types.includes(selectedType) : true;
    return matchesQuery && matchesType;
  });

  const nextPage = () => setPage((s) => s + 1);
  const prevPage = () => setPage((s) => Math.max(0, s - 1));
  const goToPage = (n: number) => setPage(Math.max(0, n));

  return {
    pokemons: filtered,
    rawPokemons: pokemons,
    isLoading,
    error,
    page,
    limit,
    total,
    query,
    setQuery,
    selectedType,
    setSelectedType,
    nextPage,
    prevPage,
    goToPage,
    reload: () => fetchData(page),
  };
};

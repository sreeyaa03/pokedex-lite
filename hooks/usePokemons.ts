import { useEffect, useState, useCallback } from "react";
import { Pokemon } from "@/types/Pokemon";
import { fetchPokemons } from "@/lib/pokeapi";

export const usePokemons = (initialLimit = 20) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { pokemons: data, count } = await fetchPokemons(page, limit);
      setTotal(count);
      setPokemons(data);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    load();
  }, [load]);

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
    reload: load,
  };
};

"use client";

import { useEffect, useState } from "react";
import { usePokemons } from "@/hooks/usePokemons";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/PokemonModal";
import { fetchPokemonTypes } from "@/lib/pokeapi";
import { useFavorites } from "@/context/FavoritesContext";

export default function HomePage() {
  const {
    pokemons,
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
  } = usePokemons(20);

  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [types, setTypes] = useState<string[]>([]);
  const { favorites } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchPokemonTypes().then(setTypes).catch(() => setTypes([]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pokedex Lite</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 items-start">
        <input
          className="border p-2 rounded w-full sm:w-64"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ background: "var(--card-bg)", color: "var(--foreground)", borderColor: "rgba(0,0,0,0.12)" }}
        />

        <select
          className="border p-2 rounded"
          value={selectedType || ""}
          onChange={(e) => setSelectedType(e.target.value || null)}
          style={{ background: "var(--card-bg)", color: "var(--foreground)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t} className="capitalize">
              {t}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 border rounded text-sm hover:opacity-80 transition"
          onClick={() => {
            setQuery("");
            setSelectedType(null);
            setShowFavorites(false);
          }}
          style={{ background: "var(--card-bg)", color: "var(--foreground)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          Clear Filters
        </button>
        <label className="flex items-center gap-2 ml-auto text-sm">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
            aria-label="Show favorites only"
            style={{ accentColor: "#facc15" }}
          />
          <span>Favorites</span>
        </label>

        <div className="ml-2 text-sm">
          Page: {page + 1} / {Math.ceil(total / limit) || 1}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12 text-xl">
          Loading Pokémons...
        </div>
      )}

      {error && (
        <div className="text-red-500">Error loading pokémons: {error}</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {(showFavorites
          ? pokemons.filter((p) => favorites.includes(p.id))
          : pokemons
        ).map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={prevPage}
          disabled={page === 0}
          style={{ background: "var(--card-bg)", color: "var(--foreground)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={nextPage}
          disabled={(page + 1) * limit >= total}
          style={{ background: "var(--card-bg)", color: "var(--foreground)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          Next
        </button>
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}


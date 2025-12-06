"use client";

import { Pokemon } from "@/types/Pokemon";
import { useFavorites } from "@/context/FavoritesContext";

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div
      className="relative border p-3 rounded-lg shadow cursor-pointer hover:brightness-105 transition-all"
      style={{
        background: "linear-gradient(135deg, rgba(248, 113, 182, 0.1), rgba(217, 70, 166, 0.1))",
        color: "var(--foreground)",
        borderColor: "rgba(232, 93, 138, 0.25)",
      }}
    >
      <button
        className="absolute top-2 right-2 text-yellow-400"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon.id);
        }}
        aria-label="Toggle favorite"
      >
        {isFavorite(pokemon.id) ? "★" : "☆"}
      </button>

      <div onClick={onClick} className="transition-transform duration-300 hover:scale-105 cursor-pointer">
        <img
          src={pokemon.image || "https://via.placeholder.com/96?text=No+Image"}
          alt={pokemon.name}
          className="mx-auto h-24 w-24 object-contain"
        />
        <p className="text-center font-semibold mt-2 capitalize" style={{ color: "var(--foreground)" }}>
          {pokemon.name}
        </p>
      </div>
    </div>
  );
}

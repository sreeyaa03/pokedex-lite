import { Pokemon } from "@/types/Pokemon";

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn">
      <div
        className="p-6 rounded-lg w-80 max-w-full animate-slideUp border-2"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          borderColor: "rgba(232, 93, 138, 0.4)",
          boxShadow: "0 0 20px rgba(232, 93, 138, 0.15)",
        }}
      >
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mt-2 capitalize">{pokemon.name}</h2>
          <button className="text-red-500" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <img src={pokemon.image} alt={pokemon.name} className="mx-auto my-3" />

        <div className="text-center">
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p className="mt-2">
            <strong>Types:</strong> {pokemon.types.join(", ")}
          </p>
        </div>

        {pokemon.stats && (
          <div className="mt-4">
            <strong>Stats</strong>
            <ul className="mt-2">
              {pokemon.stats.map((s) => (
                <li key={s.name} className="flex justify-between">
                  <span className="capitalize">{s.name}</span>
                  <span>{s.base}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pokemon.abilities && (
          <div className="mt-3">
            <strong>Abilities</strong>
            <p className="mt-1">{pokemon.abilities.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

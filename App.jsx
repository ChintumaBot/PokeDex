import { useState } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemon = async (search) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      const data = await response.json();
      const pokemonData = {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map(typeInfo => typeInfo.type.name),
        weight: data.weight / 10, // en kg
        height: data.height / 10, // en metros
        description: "No disponible", // Puedes hacer otra llamada a la PokeAPI para obtener la descripción
        stats: data.stats.map(stat => ({
          name: stat.stat.name.toUpperCase(),
          value: stat.base_stat
        }))
      };
      setPokemon(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setPokemon(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchPokemon(searchTerm);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Pokémon by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;

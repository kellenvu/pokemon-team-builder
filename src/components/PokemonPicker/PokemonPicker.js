import React, { useState } from 'react';
import pokemon from 'pokemon';
import './PokemonPicker.css';

const PokemonPicker = () => {
  const [selectedPokemon, setSelectedPokemon] = useState('');

  const handleChange = (event) => {
    setSelectedPokemon(event.target.value);
  };

  return (
    <div className="pokemon-picker">
      <select value={selectedPokemon} onChange={handleChange}>
        <option value="">Select a Pokémon</option>
        {pokemon.all().map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonPicker;

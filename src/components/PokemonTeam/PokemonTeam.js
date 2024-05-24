import React from 'react';
import PokemonPicker from './PokemonPicker/PokemonPicker';
import './PokemonTeam.css';

const PokemonTeam = ({ numPickers, onPickerChange, pokemonTeam }) => {
  return (
    <div className="pokemon-team">
      {Array.from({ length: numPickers }).map((_, index) => (
        <PokemonPicker
          key={index}
          onPickerChange={onPickerChange(index)}
          initialPokemon={pokemonTeam[index]?.name || ''}
          initialTypes={pokemonTeam[index]?.moveTypes || []}
        />
      ))}
    </div>
  );
};

export default PokemonTeam;

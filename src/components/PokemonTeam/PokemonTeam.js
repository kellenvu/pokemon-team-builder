import React from 'react';
import PokemonPicker from './PokemonPicker/PokemonPicker';
import './PokemonTeam.css';

const PokemonTeam = ({ numPickers, onPickerChange }) => {
  return (
    <div className="pokemon-team">
      {Array.from({ length: numPickers }, (_, index) => (
        <PokemonPicker key={index} onPickerChange={onPickerChange(index)} />
      ))}
    </div>
  );
};

export default PokemonTeam;

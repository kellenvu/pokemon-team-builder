import React from 'react';
import PokemonPicker from '../PokemonPicker/PokemonPicker';
import './PokemonTeam.css';

const PokemonTeam = ({ numPickers }) => {
  const pickers = [];
  for (let i = 0; i < numPickers; i++) {
    pickers.push(<PokemonPicker key={i} />);
  }

  return <div className="pokemon-team">{pickers}</div>;
};

export default PokemonTeam;

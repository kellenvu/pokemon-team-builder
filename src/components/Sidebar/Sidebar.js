import React from 'react';
import './Sidebar.css';
import PokemonPicker from '../PokemonPicker/PokemonPicker';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <h2>Your Pokémon Team</h2>
      <div className="pokemon-grid">
        <PokemonPicker />
        <PokemonPicker />
        <PokemonPicker />
        <PokemonPicker />
        <PokemonPicker />
        <PokemonPicker />
      </div>
    </div>
  );
};

export default Sidebar;

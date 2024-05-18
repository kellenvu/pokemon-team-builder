import React from 'react';
import './Sidebar.css';
import PokemonPicker from '../PokemonPicker/PokemonPicker';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <h2>Your Pokémon Team</h2>
      <ul>
        <li><PokemonPicker /></li>
      </ul>
    </div>
  );
};

export default Sidebar;

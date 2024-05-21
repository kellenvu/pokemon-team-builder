import React, { useState, useEffect } from 'react';
import pokemon from 'pokemon';
import './PokemonPicker.css';
import TypesList from './TypesList/TypesList';

const PokemonPicker = ({ onPickerChange }) => {
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonImage, setPokemonImage] = useState('');

  const handlePokemonChange = async (event) => {
    const name = event.target.value;
    setSelectedPokemon(name);
    onPickerChange(name, selectedTypes);
    await fetchPokemonImage(name);
  };

  const handleTypeToggle = (type, isSelected) => {
    const newTypes = isSelected
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    onPickerChange(selectedPokemon, newTypes);
  };

  const fetchPokemonImage = async (name) => {
    try {
      const pokemonId = pokemon.getId(name);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();

      const showdownImage = data.sprites.other?.showdown?.front_default;
      const defaultImage = data.sprites.front_default;

      if (showdownImage) {
        setPokemonImage(showdownImage);
      } else {
        setPokemonImage(defaultImage);
      }
    } catch (error) {
      console.error('Error fetching Pokémon image:', error);
      setPokemonImage('');
    }
  };

  return (
    <div className="pokemon-picker">
      <select value={selectedPokemon} onChange={handlePokemonChange}>
        <option value="">Select a Pokémon</option>
        {pokemon.all().slice().sort().map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className="pokemon-image-box">
        {pokemonImage && (
          <img
            src={pokemonImage}
            alt={selectedPokemon}
            className="pokemon-image"
            onError={() => setPokemonImage('')}
          />
        )}
      </div>
      <p className="">Damaging Attacks:</p>
      <TypesList selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
    </div>
  );
};

export default PokemonPicker;

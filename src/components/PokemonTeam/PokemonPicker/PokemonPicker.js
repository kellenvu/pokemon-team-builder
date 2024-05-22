import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import pokemon from 'pokemon';
import './PokemonPicker.css';
import TypesList from './TypesList/TypesList';

const PokemonPicker = ({ onPickerChange }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonImage, setPokemonImage] = useState('');

  const pokemonOptions = pokemon.all().slice().sort().map((name) => ({
    label: name,
    value: name,
  }));

  const handlePokemonChange = async (selectedOption) => {
    const name = selectedOption ? selectedOption.value : '';
    setSelectedPokemon(selectedOption);
    onPickerChange(name, selectedTypes);
    await fetchPokemonImage(name);
  };

  const handleTypeToggle = (type, isSelected) => {
    const newTypes = isSelected
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    onPickerChange(selectedPokemon ? selectedPokemon.value : '', newTypes);
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
      <Select
        value={selectedPokemon}
        onChange={handlePokemonChange}
        options={pokemonOptions}
        isClearable
        placeholder="Select a Pokémon"
      />
      <div className="pokemon-image-box">
        {pokemonImage && (
          <img
            src={pokemonImage}
            alt={selectedPokemon ? selectedPokemon.label : ''}
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
